const URLS =
{
    UrlTX: process.env.URL_TX,
    UrlAPI: process.env.URL_API,
};
(async () => {
    try {
        const result = await consultaAuxiliar();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error.message);
    }
})();

async function consultaAuxiliar() {
    let query = `select top 50 Id, Nombre,Apellidos,FechaCreacion, NumeroDocumento, TipoDocumento, Rol, CorreoElectronico, Contrasena, (select Id from SimiladorDNC_Lappiz_GrupoUsuario where CodigoGrupo = Grupo) as Grupo from SimiladorDNC_Lappiz_AuxiliarUsuario where Estado = 'Activo'`
    let response = await consultar(query)

    let actualizacion = await Estado(response)

    let token = await getToken()
    for (let Datos of response) {
        await procesar(Datos, token);

    }
    query = 'EXEC SimiladorDNC_Lappiz_EmailConfirmed @sw = 1'
    await consultar(query)

    return ('Usuarios insertados')
};

async function procesar(datos, token) {
    if (datos.Nombre != 'undefined' && datos.Apellidos && datos.TipoDocumento != 'undefined' && datos.NumeroDocumento != 'undefined' && datos.Contrasena != 'undefined' && datos.Grupo != 'undefined' && datos.Rol != 'undefined') {
        /* Obtenemos los valores para registrar el usuario */
        let nombre = datos.Nombre,
            apellidos = datos.Apellidos,
            fechacreacion = datos.FechaCreacion,
            tipoDocumento = datos.TipoDocumento,
            numeroDocumento = datos.NumeroDocumento,
            email = `${datos.TipoDocumento.split('')[0]}${datos.NumeroDocumento}@bdb.com`,
            usuario = '',
            CorreoElectronico = datos.CorreoElectronico,
            Contrasena = datos.Contrasena,
            Grupo = datos.Grupo,
            rol = datos.Rol,
            idRol = await obtenerIdRol(rol, token) || "40b1e10d-4b7a-42ae-bf46-d5b6a74c30e7",
            inicial = ''
        switch (tipoDocumento) {
            case 'CC':
                inicial = "C";
                break;
            case 'NIT':
                inicial = "N";
                break;
            case 'CE':
                inicial = "E";
                break;
        }
        email = `${inicial}${datos.NumeroDocumento}@bdb.com`
        usuario = `${inicial}${datos.NumeroDocumento}`
        /* Obtenemos el token de la transaccional */

        /* Fin del código para obtener el token de la transaccional */

        /* Inicio del código para registrar el cliente*/
        if (token) {

            /* Consultamos si el cliente ya existe */
            let queryExiste = await consultar(
                `SELECT * FROM SimiladorDNC_Lappiz_Users WHERE Identification = '${numeroDocumento}'`
            );


            if (queryExiste.length > 0) {
                return ("Ya se encuentra registrado en la aplicación");
            } else {
                try {

                    var bodyUser = {
                        FullName: nombre,
                        Apellidos: apellidos,
                        FechaCreacion: fechacreacion,
                        TipoDocumento: tipoDocumento,
                        Identification: numeroDocumento,
                        Email: email,
                        CorreoElectronico: CorreoElectronico,
                        Contrasena: Contrasena,
                        Usuario: usuario,
                        Grupo: Grupo

                    }
                    if (bodyUser.Apellidos == 'undefined') {
                        bodyUser.Apellidos = ''
                    }
                    let insertusuario = `declare @Id uniqueidentifier set @Id = newId()
                    INSERT INTO SimiladorDNC_Lappiz_Users (
                        id,FullName, TipoDocumento, Identification, CorreoElectronico,Email,Usuario, Contrasena, GruposFk, FechaCreacion,Created_date, Activo, BanderaContrasena, AuthType
                    ) VALUES (
                         @Id,
                        '${bodyUser.Apellidos}, ${bodyUser.FullName}',
                        '${bodyUser.TipoDocumento}',
                        '${bodyUser.Identification}',
                        '${bodyUser.CorreoElectronico}',
                        '${bodyUser.Email}',
                        '${bodyUser.Usuario}',
                        '${bodyUser.Contrasena}',
                        '${bodyUser.Grupo}',
                        '${bodyUser.FechaCreacion}',
                        '${bodyUser.FechaCreacion}',
                        1,
                        1,
                        'Lappiz'
                    );
                    select id from SimiladorDNC_Lappiz_Users where Id = @Id;
                `;


                    let responseUsuario = await consultar(insertusuario);

                    if (responseUsuario[0].id) {
                        let idUser = responseUsuario[0].id;


                        /* Replicar User */
                        var bodyReplicate = {
                            UserName: `${nombre}`,
                            Email: `${email}`,
                            FullName: `${bodyUser.Apellidos}, ${bodyUser.FullName}`,
                            PasswordHash: `${Contrasena}`,
                            Activo: true,
                            AuthType: 'Lappiz',
                            TwoFactorEnable: false,
                            Id: `${idUser}`
                        }

                        let url = URLS.UrlAPI + `/Api/api/Users/replicate?appCode=SimiladorDNC_Lappiz&languageApp=es&runtime=beta`;

                        let config = {
                            method: "post",
                            maxBodyLength: Infinity,
                            url: url,
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `bearer ${token}`,
                            },
                            data: bodyReplicate
                        };

                        let responsereplicate = await axios.request(config);


                        /* Asignar rol al usuario */
                        let idTipoRol = idRol


                        var bodyRol = [{
                            idRol: `${idTipoRol}`,
                            Action: 'Save'
                        },];

                        idUser = idUser.toUpperCase();

                        url = URLS.UrlAPI + `/Api/api/Roles/SaveChanges?idUser=${idUser}`;

                        config = {
                            method: "post",
                            maxBodyLength: Infinity,
                            url: url,
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                            data: bodyRol,
                        };
                        let responseRol = await axios.request(config);

                        let query = `update SimiladorDNC_Lappiz_AuxiliarUsuario set Estado = 'Ingresado' where NumeroDocumento = '${numeroDocumento}'; select 1`

                        await consultar(query)
                        return ('Usuario registrado correctamente');




                    } else {

                        return ('El usuario ya se encuentra registrado en la aplicación');
                    }
                } catch (err) {
                    return (err.message);
                }
            };
        }
    } else {
        return ('No tiene los campos completos');
    }//finalizar if de campos
};

async function consultar(query) {
    //   let data = JSON.stringify({
    //     query: query,
    //     tenantId: "null",
    //     parameters: {
    //       aType: "execTx",
    //       environment: "TEST",
    //       userId: 'c28bce39-7e3d-4771-b398-7bf09d252b2d',
    //     },
    //   });
    //   var token = `Bearer ${await getToken()}`;
    //   let config1 = {
    //     method: "post",
    //     maxBodyLength: Infinity,
    //     url: "https://txtest.lappiz.io/SimiladorDNC_Lappiz.api/api/lappiz/sp/query",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: token,
    //     },
    //     data: data,
    //   };

    let response = await controller.execQuery({ query })
    //   return res.status(200).send(response.result[0])
    if (response.result[0]) {
        return response.result[0]
    } else {
        return ('información actualizada')
    }

};
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
};


async function obtenerIdRol(nombreRol, token) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: URLS.UrlAPI + '/Api/api/Roles/getRoles/e402b0fe-7b28-462d-b313-545064751c21',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    let roles = await axios.request(config)
    roles = roles.data

    const rolEncontrado = roles.find(rol => rol.Nombre.toUpperCase().includes(nombreRol.toUpperCase()));
    return rolEncontrado ? rolEncontrado.id : '';
};

async function Estado(response) {
    let id = ''
    let i = 0
    for (let Datos of response) {
        if (i == 0) {
            id = `'${Datos.Id}'`
        } else {
            id = id + `,'${Datos.Id}'`
        }
        i++

    }
    let query = `UPDATE SimiladorDNC_Lappiz_AuxiliarUsuario set Estado ='Progreso' where id in (${id})`

    await consultar(query)
    return ('Información actualizada')
};