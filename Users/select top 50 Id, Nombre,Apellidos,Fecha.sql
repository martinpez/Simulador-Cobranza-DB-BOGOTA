select top 50 Id, Nombre,Apellidos,FechaCreacion, NumeroDocumento, TipoDocumento, Rol, CorreoElectronico, Contrasena, 
(select Id from SimiladorDNC_Lappiz_GrupoUsuario where CodigoGrupo = Grupo) 
as Grupo from SimiladorDNC_Lappiz_AuxiliarUsuario where Estado = 'Activo'
