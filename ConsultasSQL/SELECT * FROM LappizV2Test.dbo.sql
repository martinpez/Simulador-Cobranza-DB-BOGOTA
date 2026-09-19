SELECT * FROM LappizV2Test.dbo.RuntimeMenus where RuntimeMenuId = '06bef41f-1146-412b-9718-500b5fef96ac'

UPDATE LappizV2Test.dbo.RuntimeMenus set MenuDefinition = '[
    {
        "Type": "Root",
        "Label": "Menu",
        "index": 0,
        "items": [
            {
                "Label": "Seguridad",
                "Type": "Module",
                "id": "",
                "index": 0,
                "ModuleId": "f70ab463-faf2-4c32-8e3d-895f622a9885",
                "items": [
                    {
                        "Label": "Listado general de usuarios",
                        "Type": "View",
                        "id": "",
                        "index": 0,
                        "EntityId": "ee2505dd-c1b0-47a0-aca8-ab6fc10fcfd5",
                        "AppViewId": "0240c26d-d098-4277-b8e5-7abcafd7509e",
                        "ViewMode": ""
                    },
                    {
                        "Label": "Usuarios",
                        "Type": "View",
                        "id": "",
                        "index": 1,
                        "EntityId": "ee2505dd-c1b0-47a0-aca8-ab6fc10fcfd5",
                        "AppViewId": "4e0d635a-1b98-4d38-9a3f-1b0c4875e86e",
                        "ViewMode": ""
                    },
                    {
                        "Label": "Roles",
                        "Type": "StaticFeature",
                        "id": "",
                        "index": 2,
                        "StaticFeatureId": "a5e62267-5bfc-405a-89c0-14fdb99c9669"
                    },
                    {
                        "Label": "Asignar rol",
                        "Type": "StaticFeature",
                        "id": "",
                        "index": 3,
                        "StaticFeatureId": "b5e62267-5bfc-405a-89c0-14fdb99c966b"
                    },
                    {
                        "Label": "Lista de Errores",
                        "Type": "View",
                        "id": "",
                        "index": 4,
                        "EntityId": "a8868dde-7cd2-4ede-bde5-9ad00e043710",
                        "AppViewId": "174a2584-477a-4f1d-b3b4-efb3fc5d4d3e",
                        "ViewMode": "",
                        "items": [],
                        "expanded": true
                    }
                ],
                "expanded": false
            },
            {
                "Label": "Parametrización",
                "Type": "Module",
                "id": "",
                "index": 1,
                "ModuleId": "9e8231ae-af67-4e6e-bfe5-522c320687c2",
                "items": [
                    {
                        "Label": "Grupos de usuarios",
                        "Type": "View",
                        "id": "",
                        "index": 0,
                        "EntityId": "f059503b-8711-4bfc-8aca-12dd987f4f88",
                        "AppViewId": "bb1e74ed-fb45-4efa-b812-5739d5fcf2e0",
                        "ViewMode": "",
                        "items": [],
                        "expanded": true
                    },
                    {
                        "Label": "Actividad económica ",
                        "Type": "View",
                        "id": "",
                        "index": 1,
                        "EntityId": "d0b64647-de3f-472b-8fcb-514f12e0b219",
                        "AppViewId": "63926d09-5ea4-4539-b95e-fb6ef959284d",
                        "ViewMode": ""
                    },
                    {
                        "Label": "Tipo novación ",
                        "Type": "View",
                        "id": "",
                        "index": 2,
                        "EntityId": "8bdb8dd4-84de-4a3b-938e-5799583f1820",
                        "AppViewId": "27e969d1-d365-456b-afb7-d4396f922cb3",
                        "ViewMode": ""
                    },
                    {
                        "Label": "Plazos mecanismos",
                        "Type": "View",
                        "id": "",
                        "index": 3,
                        "EntityId": "af229712-4a83-4444-887e-9c3d61abb1a0",
                        "AppViewId": "47078f2e-47da-421e-9aee-9c2087d9334b",
                        "ViewMode": ""
                    },
                    {
                        "Label": "Plazo novación",
                        "Type": "View",
                        "id": "",
                        "index": 4,
                        "EntityId": "c8c1722f-8d8d-4882-8cf6-7227708ab30b",
                        "AppViewId": "0ca21339-c418-436b-b2eb-06b603b45172",
                        "ViewMode": ""
                    },
                    {
                        "Label": "Tasa vigentes",
                        "Type": "View",
                        "id": "",
                        "index": 5,
                        "EntityId": "17edc95d-4653-4a6b-8a5d-b909ee3adaf4",
                        "AppViewId": "dbd4b126-6c8b-4cee-95a9-ac016e684c71",
                        "ViewMode": ""
                    },
                    {
                        "Label": "Marca de obligación",
                        "Type": "View",
                        "id": "",
                        "index": 6,
                        "EntityId": "7d57890f-e176-4e17-87db-87201b272378",
                        "AppViewId": "21d9dabb-67ba-44f7-b332-64df25d11c88",
                        "ViewMode": ""
                    },
                    {
                        "Label": "Poblamiento datos",
                        "Type": "View",
                        "id": "",
                        "index": 7,
                        "EntityId": "b7f1bbb1-6c9d-4dcd-8296-0a6c79f4307c",
                        "AppViewId": "ca36ce94-24e8-4f16-a1a2-55378d059abd",
                        "ViewMode": ""
                    },
                    {
                        "Label": "Grupo Oficinas",
                        "Type": "View",
                        "id": "",
                        "index": 8,
                        "EntityId": "0ee48430-5a6b-4a1b-a305-daaa45081db3",
                        "AppViewId": "5d5043e5-bf54-45fb-8a4b-037583f22600",
                        "ViewMode": ""
                    },
                    {
                        "Label": "Lugar Expedición Documento",
                        "Type": "View",
                        "id": "",
                        "index": 9,
                        "EntityId": "37de5a21-57d9-44b1-a1fd-7360af7d25b0",
                        "AppViewId": "18bd6e1b-5e1f-487e-a68e-6c1568618a3b",
                        "ViewMode": ""
                    },
                    {
                        "Label": "Carga Masiva",
                        "Type": "View",
                        "id": "",
                        "index": 10,
                        "EntityId": "f4a5bdf9-1953-4f5e-9512-8d46542f9757",
                        "AppViewId": "0820f0e8-2412-45ca-af65-b001ae8b2040",
                        "ViewMode": "Edit",
                        "ExpresionId": "bd47b951-ac7e-41ab-a92b-f7b0f6f476d2"
                    },
                    {
                        "Label": "Honorarios",
                        "Type": "View",
                        "id": "",
                        "index": 11,
                        "EntityId": "ee5b5582-5009-43a9-9c55-da52726e9302",
                        "AppViewId": "f9960f0a-7f10-4bdc-8c19-fdbc4a707e2c",
                        "ViewMode": ""
                    },
                    {
                        "Label": "Rangos Gastos Por Cobranza",
                        "Type": "View",
                        "id": "",
                        "index": 12,
                        "EntityId": "2d6872e5-09a2-4339-8f54-7581474ae8c0",
                        "AppViewId": "51c3fc29-0dee-48c3-a488-c25ca32bf3a7",
                        "ViewMode": ""
                    },
                    {
                        "Label": "Linea Producto",
                        "Type": "View",
                        "id": "",
                        "index": 13,
                        "EntityId": "7c9177af-898d-4f70-8d48-2f5790b25925",
                        "AppViewId": "e8ae7268-e6c3-42ef-8592-b1098bc5aa44",
                        "ViewMode": ""
                    },
                    {
                        "Label": "Cuentas SNR",
                        "Type": "View",
                        "id": "",
                        "index": 14,
                        "EntityId": "af6cc9be-6182-400b-8dd0-492b8b7f6b7f",
                        "AppViewId": "6c6ce68e-95dc-4302-a6fd-1ce8f58a16cc",
                        "ViewMode": ""
                    },
                    {
                        "Label": "Email Bugs CC",
                        "Type": "View",
                        "id": "",
                        "index": 15,
                        "EntityId": "1cf0115b-f169-4c22-a03d-d5541497e4f5",
                        "AppViewId": "0370a43d-84e0-47ad-84c7-6087cce56abc",
                        "ViewMode": ""
                    }
                ],
                "expanded": false,
                "EntityId": "f4a5bdf9-1953-4f5e-9512-8d46542f9757",
                "AppViewId": "0820f0e8-2412-45ca-af65-b001ae8b2040",
                "ViewMode": "New"
            },
            {
                "Label": "Formato Excepciones",
                "Type": "View",
                "id": "",
                "index": 2,
                "EntityId": "75f7d794-95f1-43a4-b445-f453fa3d3315",
                "AppViewId": "02a6b7fe-8a14-4e54-a2d5-ea4cc9508bfa",
                "ViewMode": ""
            },
            {
                "Label": "Reporteria",
                "Type": "View",
                "id": "",
                "index": 3,
                "EntityId": "0b69abb9-093d-4e7c-b0d0-34f6fa61cc3c",
                "AppViewId": "162603f7-69d7-4e82-9e31-07603a39b291",
                "ViewMode": ""
            },
            {
                "Label": "Simulador DNC",
                "Type": "View",
                "id": "",
                "index": 4,
                "EntityId": "6fcd9a5f-9578-4b2f-8d78-64e78f7ed87b",
                "AppViewId": "91d91d6b-b2dd-4649-a677-6af5eb0d45cf",
                "ViewMode": "New",
                "items": [],
                "expanded": true
            }
        ],
        "expanded": true
    }
]' where RuntimeMenuId = '06bef41f-1146-412b-9718-500b5fef96ac';