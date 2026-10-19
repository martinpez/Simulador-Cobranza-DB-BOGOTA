/*
    Ajusta únicamente las columnas de dbo.SimiladorDNC_Lappiz_FormatoExcepciones.
    No modifica metadatos ni bases V2. La recreación de las tres columnas numéricas
    descarta sus valores anteriores; ejecutarlo después de eliminar los datos existentes.
*/
SET XACT_ABORT ON;

BEGIN TRY
    BEGIN TRANSACTION;

    IF OBJECT_ID(N'dbo.SimiladorDNC_Lappiz_FormatoExcepciones', N'U') IS NULL
        THROW 50001, 'No existe dbo.SimiladorDNC_Lappiz_FormatoExcepciones en la base actual.', 1;

    IF
    (
        SELECT COUNT(*)
        FROM sys.columns
        WHERE object_id = OBJECT_ID(N'dbo.SimiladorDNC_Lappiz_FormatoExcepciones')
          AND name COLLATE DATABASE_DEFAULT IN (N'FEfechadecastigo', N'FECHAINICIODEPROCESOFE', N'FECHAETAPAPROCESALFE')
    ) <> 3
        THROW 50002, 'Falta una de las tres columnas de fecha que se cambiarán a numeric.', 1;

    IF
    (
        SELECT COUNT(*)
        FROM sys.columns
        WHERE object_id = OBJECT_ID(N'dbo.SimiladorDNC_Lappiz_FormatoExcepciones')
          AND name COLLATE DATABASE_DEFAULT IN (N'FEfechadecastigo', N'FECHAINICIODEPROCESOFE', N'FECHAETAPAPROCESALFE')
          AND TYPE_NAME(user_type_id) = N'date'
    ) <> 3
        THROW 50004, 'Las tres columnas deben seguir siendo date para ejecutar esta migración destructiva una sola vez.', 1;

    DECLARE @SQLDefaults nvarchar(max) = N'';

    SELECT @SQLDefaults = @SQLDefaults +
        N'ALTER TABLE [dbo].[SimiladorDNC_Lappiz_FormatoExcepciones] DROP CONSTRAINT ' +
        QUOTENAME(dc.name) + N';' + CHAR(10)
    FROM sys.default_constraints AS dc
    INNER JOIN sys.columns AS sc
        ON sc.object_id = dc.parent_object_id
       AND sc.column_id = dc.parent_column_id
    WHERE dc.parent_object_id = OBJECT_ID(N'dbo.SimiladorDNC_Lappiz_FormatoExcepciones')
      AND sc.name COLLATE DATABASE_DEFAULT IN (N'FEfechadecastigo', N'FECHAINICIODEPROCESOFE', N'FECHAETAPAPROCESALFE');

    IF @SQLDefaults <> N''
        EXEC sys.sp_executesql @SQLDefaults;

    ALTER TABLE dbo.SimiladorDNC_Lappiz_FormatoExcepciones
        DROP COLUMN FEfechadecastigo, FECHAINICIODEPROCESOFE, FECHAETAPAPROCESALFE;

    ALTER TABLE dbo.SimiladorDNC_Lappiz_FormatoExcepciones
        ADD FEfechadecastigo numeric(10,0) NULL,
            FECHAINICIODEPROCESOFE numeric(10,0) NULL,
            FECHAETAPAPROCESALFE numeric(10,0) NULL;

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
           AND columna.name COLLATE DATABASE_DEFAULT = cambio.NombreColumna COLLATE DATABASE_DEFAULT
        WHERE columna.column_id IS NULL
    )
        THROW 50003, 'Falta una de las columnas de texto esperadas en la tabla FormatoExcepciones.', 1;

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
       AND sc.name COLLATE DATABASE_DEFAULT = c.NombreColumna COLLATE DATABASE_DEFAULT;

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
