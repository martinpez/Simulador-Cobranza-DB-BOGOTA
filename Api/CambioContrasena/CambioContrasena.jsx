const URLS = getConstants(obj, res);
(async () => {
    try {
        const result = await Contrasena();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error.message);
    }
})();

async function Contrasena() {
    const token = await obtenerToken();
    if (!token) throw new Error('No se pudo obtener el token');
    try {
        let id = obj.body.Id
        let documento = obj.body.Documento
        let data = JSON.stringify({
            "UserName": obj.body.dataItem.Email,
            "Email": obj.body.dataItem.Email,
            "Id": id,
            "Activo": true,
            "PasswordHash": `Bdb.${documento}`,
            "FullName": obj.body.dataItem.FullName,
            "TwoFactorEnabled": false,
            "AuthType": 'Lappiz',
            "PhoneNumber": obj.body.dataItem.Phone
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: URLS.UrlAPI + '/Api/api/Users/replicateUpd?appCode=SimiladorDNC_Lappiz&languageApp=es&runtime=beta',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            data: data
        };

        let response = await axios.request(config)
        // consulta la tabla de cada environment
        let tablaUsers = ''
        if (_appsettings.environment === 'TEST') {
            tablaUsers = 'SimiladorDNC_Lappiz_Users'
        } else if (_appsettings.environment === 'PROD') {
            tablaUsers = 'Lappiz_Users'
        }

        let query = `UPDATE ${tablaUsers} SET BanderaContrasena = 1 WHERE id = '${id}'`
        let update = await controller.execQuery({ query })
        return response.data
    } catch (error) {
        return (error);
    };
}

// obtiene el token de autorización para la API
async function obtenerToken() {
    const response = await axios.request({
        method: 'post',
        url: `${URLS.UrlTX}/SimiladorDNC_Lappiz.api/api/functions/getToken`,
        headers: { 'Content-Type': 'application/json' },
        data: {}
    });

    const d = response.data;
    // Acepta que venga como texto o dentro de un objeto
    return typeof d === 'string' ? d : (d?.token ?? d?.access_token ?? d?.result ?? null);
}