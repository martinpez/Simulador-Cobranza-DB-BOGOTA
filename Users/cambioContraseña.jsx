var token = '';
const URLS = getConstants(obj, res);
(async () => {
    try {
        token = `Bearer ${await getToken()}`;
        
        const result = await Contrasena();
        
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error.message);
    }
})();

async function Contrasena() {
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
       
        let query = `UPDATE SimiladorDNC_Lappiz_Users SET BanderaContrasena = 1 WHERE id = '${id}'`
        let update = await controller.execQuery({query})
        return response.data
    } catch (error) {
        return (error);
    };
}
async function getToken() {
    try {
        const url = URLS.UrlAPI + "/Api/token";
        const data = new URLSearchParams();
        data.append("grant_type", "password");
        data.append("username", "administrador@simuladordnc.com");
        data.append("password", "Simulador.2023");
        const config = {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        };

        const response = await axios.post(url, data, config);
        return response.data.access_token;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}