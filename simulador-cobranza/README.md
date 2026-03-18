# Simulador de Cobranza — Banco de Bogotá

Scripts y componentes desarrollados para el **Simulador de Normalización de Cartera (DNC)** de Banco de Bogotá, integrado sobre la plataforma **Lappiz**. El sistema gestiona los mecanismos de solución de pago para clientes en mora: Ampliación de Plazo, Pago de Mora, Novación, Cancelación y Consolidación.

---

## Estructura del repositorio

```
simulador-cobranza-banco-bogota/
│
├── navegacion/                  # Lógica de navegación entre vistas del formulario
├── carga-datos/                 # Carga masiva de archivos CSV/Excel (Web Workers)
├── calculos/                    # Cálculos financieros por mecanismo
├── validaciones-sox/            # Validación y sincronización de campos SOX
├── formatos-fun/                # Plantillas HTML de formatos FUN (exportables a PDF)
│   └── assets/                  # Recursos estáticos (logo SVG)
├── power-apps/                  # Código YAML de pantallas PowerApps para generación de FUN
├── ui-componentes/              # Componentes de interfaz: mantenimiento, declaración fiscal, carga
└── _legacy/                     # Versiones anteriores conservadas como referencia
```

---

## Módulos

### `navegacion/`

Controla el flujo entre las **16 vistas** del formulario principal en Lappiz.

| Archivo | Descripción |
|---|---|
| `navegacion.js` | Versión activa. Define `VISTAS`, el mapa `OBSERVATION_SOX_MAP`, el contador de caracteres SOX y los listeners de navegación por mecanismo. |
| `navegacion_legacy.js` | Versión anterior. Usaba selectores CSS directos en lugar de la función `navegarA()`. Conservado como referencia. |

**Vistas gestionadas:** Principal · Novaciones (P1–P2) · Ampliación (P1–P3) · Cancelación (P1–P3) · Consolidación (P1–P4) · Pago Mora (P1–P2) · Información Cliente

---

### `carga-datos/`

Procesamiento de archivos CSV/Excel en segundo plano usando **Web Workers** con lógica de reintentos ante errores 504.

| Archivo | Descripción |
|---|---|
| `CargarExcelPoblamiento.js` | Carga masiva del dataset de clientes (`datos.csv`) al endpoint `PoblamientoDatos` de la API Lappiz. |
| `CargarExcelOficinas.js` | Carga del maestro de oficinas (`datos_oficina.csv`). Incluye eliminación previa del archivo anterior. |
| `EliminarDatos.js` | Función para limpiar registros cargados previamente via `execLF`. |

---

### `calculos/`

Lógica financiera por mecanismo de normalización.

| Archivo | Mecanismo | Descripción |
|---|---|---|
| `CalculosConsolidacion.js` | Consolidación | Suma de intereses corriente/mora/extracontables, aplica porcentajes de descuento y calcula saldo a desembolsar. |
| `ObligacionesSinConsolidacion.js` | Consolidación | Renderizado dinámico de tarjetas de obligación para productos sin base de consolidación. |
| `TasaCampana.js` | Múltiple | Pobla campos de campaña y agrega/elimina la opción "TASA CAMPAÑA" en el DropDownList de novación (Kendo UI). |
| `Ampliacion.js` | Ampliación | Versión base de cálculos de ampliación de plazo. |
| `AmpliacionMejoras.js` | Ampliación | Versión mejorada con ajustes sobre `Ampliacion.js`. |
| `TasaEspecial.js` | Múltiple | Lógica para aplicación de tasas especiales de campaña. |
| `TasaCero.js` | Múltiple | Manejo del caso tasa 0% en negociación. |
| `Poblamiento.js` | General | Utilidades de poblamiento de campos en el formulario. |

---

### `validaciones-sox/`

Validación de longitud y sincronización de campos de **observación SOX** (máximo 1100 caracteres).

| Archivo | Descripción |
|---|---|
| `campos.js` | Define `OBSERVATION_FIELDS` y aplica `maxlength` + contador visual a los textareas de observación (límite 1000 chars). |
| `ReglasSOX1100.js` | Versión activa. Crea contadores visuales por campo SOX, bloquea escritura al alcanzar el límite y restaura el estado normal al borrar. |
| `ReflejaSox.js` | Sincroniza el contenido del campo de observación con el campo SOX concatenado en formato clave (`FECHAPAGOXX...LLLVALOR...LLL`) para cada mecanismo: Mora, Consolidación y Novación. |

> **Nota:** El campo SOX tiene un formato estructurado propio del sistema Lappiz. Las funciones `reflejarSoxMora()`, `reflejarSoxConsolidado()` y `reflejarSoxNovacion()` construyen ese string automáticamente al editar el campo de observación.

---

### `formatos-fun/`

Plantillas HTML con estilos inline para generar los **Formatos Únicos de Normalización (FUN)** exportables a PDF via `html2pdf.js`.

| Archivo | Mecanismo |
|---|---|
| `fun-ampliacion.html` | Ampliación de Plazo |
| `fun-cancelacion.html` | Cancelación Total |
| `fun-consolidacion.html` | Consolidación de Productos |
| `fun-novacion.html` | Novación |
| `fun-pagomora.html` | Pago de Mora |
| `contenedor.html` | Contenedor HTML inyectado en la vista Lappiz con el botón "Guardar Fun" |
| `index.js` | Función `formatFun()` que abre la plantilla correspondiente en nueva pestaña |
| `assets/banco-bogota.svg` | Logo vectorial del Banco de Bogotá |

---

### `power-apps/`

Código YAML de pantallas **Microsoft Power Apps** que replican la funcionalidad de generación del FUN en el entorno Power Platform.

| Archivo | Pantalla |
|---|---|
| `Fun_Ampliacion.txt` | `From_Genera_Formato_Ampliacion` |
| `Fun_Cancelacion.txt` | `From_Genera_Formato_Cancelacion` |
| `Fun_Consolidacion.txt` | `From_Genera_Formato_Consolidacion` |
| `Fun_PagoMora.txt` | `From_Genera_Formato_Pago_mora` |

---

### `ui-componentes/`

Componentes de interfaz de usuario independientes.

| Archivo | Descripción |
|---|---|
| `declaracion-residencia-fiscal.html` | Formulario de declaración de residencia fiscal (FATCA/CRS) con preguntas de permanencia en EE.UU. y Colombia. |
| `mantenimiento.html` | Overlay de mantenimiento inyectado en el Simulador cuando el sistema está en pausa. |
| `mantenimiento.js` | Lógica del overlay: prefijado CSS con `bbmnt-`, z-index fijo, control de visibilidad. |
| `visitas.html` | Interfaz de carga del maestro de oficinas (input de archivo + botones Cargar/Eliminar). |
| `carga-oficinas.html` | Contenedor HTML con botón "Guardar Fun" para el módulo de carga de oficinas. |

---

### `_legacy/`

Archivos de versiones anteriores conservados únicamente como referencia histórica. **No usar en producción.**

| Archivo | Descripción |
|---|---|
| `navegacion_pasada_copia.jsx` | Copia `.jsx` idéntica a `navegacion_legacy.js` |
| `ReglasSOX_v1.js` | Primera versión del validador SOX (lógica de bloqueo diferente) |
| `Declaracion_copia.html` | Copia de trabajo de la declaración fiscal |

---

## Tecnologías

- **Plataforma:** Lappiz (Low-Code)
- **Frontend:** JavaScript vanilla · HTML · CSS
- **UI Libraries:** Bootstrap 5 · Kendo UI · SweetAlert2 (Swal) · toastr
- **PDF:** html2pdf.js
- **Excel/CSV:** SheetJS (xlsx)
- **No-Code:** Microsoft Power Apps
- **Concurrencia:** Web Workers API

## Convenciones del código

- Los IDs de campo son GUIDs generados por Lappiz (ej: `'be70a202-71a9-40ea-851b-945702693b51'`)
- Las funciones globales como `getFieldValue()`, `setFieldValue()`, `disableField()`, `execLF()`, `execQuery()` y `backandGlobal` son provistas por el runtime de Lappiz
- Los archivos `.jsx` en este repo **no son componentes React** — son scripts JavaScript nombrados así por convención interna del equipo dentro de VSCode

## Notas de seguridad

> ⚠️ Este repositorio no debe contener credenciales, tokens de API, ni variables de entorno sensibles.  
> Los IDs de función Lappiz (`lappizFunctionId`) son identificadores internos del ambiente de desarrollo.
