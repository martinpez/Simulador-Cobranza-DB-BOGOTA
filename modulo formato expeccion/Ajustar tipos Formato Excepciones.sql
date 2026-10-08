/*
    Alinea los metadatos de Campos y la tabla de destino con las reglas del
    Formato de Excepciones. Ejecutar en la base que contiene dbo.SimiladorDNC_Lappiz_FormatoExcepciones.
*/
SET XACT_ABORT ON;

BEGIN TRY
    BEGIN TRANSACTION;

    IF OBJECT_ID(N'dbo.SimiladorDNC_Lappiz_FormatoExcepciones', N'U') IS NULL
        THROW 50001, 'No existe dbo.SimiladorDNC_Lappiz_FormatoExcepciones en la base actual.', 1;

    UPDATE c
    SET c.SqlType = cambios.SqlType
    FROM LappizV2Prod.dbo.Campos AS c
    INNER JOIN
    (
        VALUES
            (CONVERT(uniqueidentifier, '6668D103-6E5D-4225-A578-9F9D144FB011'), N'VarChar'), -- ETAPA DE PROCESO
            (CONVERT(uniqueidentifier, '65E882E4-8B5E-40DC-B106-EAD5ADB26951'), N'VarChar'), -- ESTADO_RECLAMACIÓN_FNG_FAG
            (CONVERT(uniqueidentifier, '427B5B63-DB83-416E-A1C5-566FAAD3384F'), N'VarChar'), -- MEDIDAS CAUTELARES
            (CONVERT(uniqueidentifier, '37E118E1-6F5E-4845-B522-4A8AFB32D219'), N'Date')     -- FECHA_PAGO
    ) AS cambios(CampoId, SqlType)
        ON c.CampoId = cambios.CampoId
    WHERE c.Tablaid = '75f7d794-95f1-43a4-b445-f453fa3d3315'
      AND c.SqlType <> cambios.SqlType;

    DECLARE @CambiosTabla TABLE
    (
        NombreColumna sysname PRIMARY KEY,
        TipoDestino nvarchar(30)
    );

    INSERT INTO @CambiosTabla (NombreColumna, TipoDestino)
    VALUES
        (N'ETAPADEPROCESOFE', N'varchar(2000)'),
        (N'ESTADORECLAMACINFNGFAGfe', N'varchar(2000)'),
        (N'MEDIDASCAUTELARESFE', N'varchar(2000)');

    IF EXISTS
    (
        SELECT 1
        FROM @CambiosTabla AS cambio
        LEFT JOIN sys.columns AS columna
            ON columna.object_id = OBJECT_ID(N'dbo.SimiladorDNC_Lappiz_FormatoExcepciones')
           AND columna.name = cambio.NombreColumna
        WHERE columna.column_id IS NULL
    )
        THROW 50002, 'Falta una de las columnas de texto esperadas en la tabla FormatoExcepciones.', 1;

    DECLARE @NombreColumna sysname;
    DECLARE @TipoDestino nvarchar(30);
    DECLARE @Nulabilidad nvarchar(10);
    DECLARE @SQL nvarchar(max);

    DECLARE cursor_cambios CURSOR LOCAL FAST_FORWARD FOR
    SELECT
        c.NombreColumna,
        c.TipoDestino,
        CASE WHEN sc.is_nullable = 1 THEN N' NULL' ELSE N' NOT NULL' END
    FROM @CambiosTabla AS c
    INNER JOIN sys.columns AS sc
        ON sc.object_id = OBJECT_ID(N'dbo.SimiladorDNC_Lappiz_FormatoExcepciones')
       AND sc.name = c.NombreColumna;

    OPEN cursor_cambios;

    FETCH NEXT FROM cursor_cambios
    INTO @NombreColumna, @TipoDestino, @Nulabilidad;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @SQL =
            N'ALTER TABLE [dbo].[SimiladorDNC_Lappiz_FormatoExcepciones] ' +
            N'ALTER COLUMN ' + QUOTENAME(@NombreColumna) + N' ' +
            @TipoDestino + @Nulabilidad + N';';

        EXEC sys.sp_executesql @SQL;

        FETCH NEXT FROM cursor_cambios
        INTO @NombreColumna, @TipoDestino, @Nulabilidad;
    END;

    CLOSE cursor_cambios;
    DEALLOCATE cursor_cambios;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF CURSOR_STATUS('local', 'cursor_cambios') >= 0
        CLOSE cursor_cambios;

    IF CURSOR_STATUS('local', 'cursor_cambios') > -3
        DEALLOCATE cursor_cambios;

    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    THROW;
END CATCH;
