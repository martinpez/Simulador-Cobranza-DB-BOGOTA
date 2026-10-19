/*
    Agrega la columna GrupoAgencia (varchar(150), NULL) a dbo.SimiladorDNC_Lappiz_FormatoExcepciones.
    Es idempotente: si la columna ya existe, no realiza cambios.
    Ejecutar antes de desplegar el JS que inserta GrupoAgencia.
*/
SET XACT_ABORT ON;

BEGIN TRY
    BEGIN TRANSACTION;

    IF OBJECT_ID(N'dbo.SimiladorDNC_Lappiz_FormatoExcepciones', N'U') IS NULL
        THROW 50001, 'No existe dbo.SimiladorDNC_Lappiz_FormatoExcepciones en la base actual.', 1;

    IF NOT EXISTS
    (
        SELECT 1
        FROM sys.columns
        WHERE object_id = OBJECT_ID(N'dbo.SimiladorDNC_Lappiz_FormatoExcepciones')
          AND name COLLATE DATABASE_DEFAULT = N'GrupoAgencia'
    )
    BEGIN
        ALTER TABLE dbo.SimiladorDNC_Lappiz_FormatoExcepciones
            ADD GrupoAgencia varchar(150) NULL;
    END;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    THROW;
END CATCH;
