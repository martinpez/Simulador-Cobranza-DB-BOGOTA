-- =============================================
-- ACTUALIZACIÓN: FechaProceso = '24/09/2026', RowStatus = 'Active'
-- =============================================

-- Novacion casas menor
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('17D314BE-2A79-4F73-BABE-7EAB6C1C9090');
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('390AB764-8F0B-477F-BAC1-2BAA42774A67');

-- Novacion temprana
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('3210BF32-58F5-4928-A1F4-E272032BF345');
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('C28DD42B-6E11-44A0-B253-FFFA39CEF0A7');

-- Novacion Piloto
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('E904E8ED-8BEA-4C7B-A13B-4DAF9AC86E22');
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('61A53A06-516D-4B48-8347-010C9A074645');

-- Pago mora casa menor 210 --CR
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('8E85764F-F3DA-45E3-8E59-B0F46C5AD81F');

-- Pago mora casa menor 210 --TC
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('1DB45D9E-D99B-4EAA-94B8-A48F5006F1AE');

-- Pago Mora Temprana -- CR
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('AD74AF18-4FFC-4745-AC9A-000348D96C72');

-- Pago Mora Temprana -- TC
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('BAFEE689-4A99-4082-9BC6-0B83477E82F4');

-- Pago Mora Piloto -- CR
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('672D2649-F3FD-4BED-85EA-92827884BDAE');

-- Pago Mora Piloto -- TC
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('8C10BF74-2E72-4978-B640-BF0F6CDB95B0');

-- Cancelacion Casas menor --CR
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('52F18716-5C22-49CE-AD25-11A5794F36E7');

-- Cancelacion Casas menor --TC
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('1DB45D9E-D99B-4EAA-94B8-A48F5006F1AE');

-- Cancelacion Temprana --CR
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('FC5A4FD8-A8C4-4FA0-AD2D-EB187FD2B8EC');

-- Cancelacion Temprana --TC
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('1DB45D9E-D99B-4EAA-94B8-A48F5006F1AE');

-- Cancelacion Pilotos --CR
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('6628C258-AAA7-4BC5-B612-C54E10291969');

-- Cancelacion Pilotos --TC
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('5A110405-1DE5-4011-990E-D810E7D04BA4');

-- Ampliacion casas menor --CR
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('19A3ED87-8A37-49D8-A630-7B219598A434');

-- Ampliacion Temprana --CR
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('71DC0161-4856-446A-BD18-7DCAB27438D2');

-- Ampliacion piloto --CR
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('672D2649-F3FD-4BED-85EA-92827884BDAE');

-- Test Playwright
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE Identificacion = '1000000100';

-- Consolidacion --CR
UPDATE SimiladorDNC_Lappiz_PoblamientoDatos SET FechaProceso = '24/09/2026', RowStatus = 'Active' WHERE ID IN ('D75060AA-F4B6-444E-8A26-FC26C21F2D5F', 'D5F681B9-81C8-40EE-8AC9-1E1F1939DFE9');

-- =============================================
-- VERIFICACIÓN: SELECT de todos los registros actualizados
-- =============================================

SELECT * FROM SimiladorDNC_Lappiz_PoblamientoDatos WHERE ID IN (
  '17D314BE-2A79-4F73-BABE-7EAB6C1C9090',
  '390AB764-8F0B-477F-BAC1-2BAA42774A67',
  '3210BF32-58F5-4928-A1F4-E272032BF345',
  'C28DD42B-6E11-44A0-B253-FFFA39CEF0A7',
  'E904E8ED-8BEA-4C7B-A13B-4DAF9AC86E22',
  '61A53A06-516D-4B48-8347-010C9A074645',
  '8E85764F-F3DA-45E3-8E59-B0F46C5AD81F',
  '1DB45D9E-D99B-4EAA-94B8-A48F5006F1AE',
  'AD74AF18-4FFC-4745-AC9A-000348D96C72',
  'BAFEE689-4A99-4082-9BC6-0B83477E82F4',
  '672D2649-F3FD-4BED-85EA-92827884BDAE',
  '8C10BF74-2E72-4978-B640-BF0F6CDB95B0',
  '52F18716-5C22-49CE-AD25-11A5794F36E7',
  'FC5A4FD8-A8C4-4FA0-AD2D-EB187FD2B8EC',
  '6628C258-AAA7-4BC5-B612-C54E10291969',
  '5A110405-1DE5-4011-990E-D810E7D04BA4',
  '19A3ED87-8A37-49D8-A630-7B219598A434',
  '71DC0161-4856-446A-BD18-7DCAB27438D2',
  'D75060AA-F4B6-444E-8A26-FC26C21F2D5F',
  'D5F681B9-81C8-40EE-8AC9-1E1F1939DFE9'
)
OR Identificacion = '1000000100';
