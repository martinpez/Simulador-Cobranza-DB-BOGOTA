function getItauState() {
    if (!window.itauState) {
        window.itauState = {
            data: [],
            mapaLineas: {},
            vista: 'cards' // 'cards' | 'tabla'
        };
    }
    return window.itauState;
}

function toggleOtrosMecanismosItau(bloquear) {
    document.querySelectorAll('.btnSimulador:not(.itau)').forEach(btn => {
        btn.style.display = bloquear ? 'none' : '';
    });
}

function obligacionesitauvacia(data) {
    window.cambiarVista = cambiarVista;
    window.obligacionesitau = obligacionesitau;
    window.obligacionesitauvacia = obligacionesitauvacia;

    const consolidacionDiv = document.getElementById("consolidacionitahu");
    const btnItau = document.querySelector('.btnSimulador.itau');
    if (consolidacionDiv) { consolidacionDiv.innerHTML = ""; }
    if (btnItau) { btnItau.style.display = 'none'; }
    toggleOtrosMecanismosItau(false);
    const state = getItauState();
    state.data = [];
    state.mapaLineas = {};
}

// ---------- Campos compartidos (cards y tabla usan la misma lista) ----------
function getItauFields(item, nombreLinea) {
    return [
        { label: "Grupo",                    value: item.Grupo },
        { label: "Producto",                 value: item.Producto },
        { label: "Dia Facturacion",          value: item.CustomNumber2 },
        { label: "Fecha Limite De Pago",     value: item.CustomChar4 },
        { label: "Dias Mora",                value: item.DiasMoraObl },
        { label: "Saldo Total",              value: item.SaldoTotalObl, isMoney: true },
        { label: "Pago Minimo",              value: item.PagoMinObl, isMoney: true },
        { label: "Capital Total",            value: item.CapitalTotalObl, isMoney: true },
        { label: "Interes Cte",              value: item.InteresCteObl, isMoney: true },
        { label: "Interes Mora",             value: item.InteresMoraObl, isMoney: true },
        { label: "Interes Extracontables",   value: item.InteresesExtracontablesObl, isMoney: true },
        { label: "Otros Cargos Exigibles",   value: item.OtrosCargosExigibles, isMoney: true },
        { label: "Prima Unica",              value: item.PrimaUnica, isMoney: true },
        { label: "Intereses Gastos Nofact",  value: item.IntGastosNofact, isMoney: true },
        { label: "Valor Honorarios",         value: item.CustomNumber1, isMoney: true },
        { label: "Tipo de Cartera",          value: item.CustomChar1 },
        { label: "Tipo de Cobro",            value: item.CustomChar3 },
        { label: "Tipo de Linea",            value: nombreLinea },
        { label: "Tipo de Tasa ICS",         value: item.TipoTasaIcs },
        { label: "Aplica Campana",           value: item.AplicaCampana },
        { label: "Mecanismo Aplica Campana", value: item.MecanismoAplicaCampana },
        { label: "Marca Camp",               value: item.MarcaCampCrm },
        { label: "Marca Obl",                value: item.MarcaObl026 },
    ];
}

async function obligacionesitau(data) {
    window.cambiarVista = cambiarVista;
    window.obligacionesitau = obligacionesitau;
    window.obligacionesitauvacia = obligacionesitauvacia;

    const consolidacionDiv = document.getElementById("consolidacionitahu");
    const btnItau = document.querySelector('.btnSimulador.itau');
    if (!consolidacionDiv) { return; }
    consolidacionDiv.innerHTML = "";
    if (!data || data.length === 0) {
        if (btnItau) { btnItau.style.display = 'none'; }
        toggleOtrosMecanismosItau(false);
        return;
    }
    let dataItau = data.filter(item =>
        (item.Grupo || "").trim().toUpperCase() === "ITAU"
    );
    if (dataItau.length === 0) {
        console.log("ITAU: no se encontraron obligaciones");
        if (btnItau) { btnItau.style.display = 'none'; }
        toggleOtrosMecanismosItau(false);
        return;
    }
    // --- AQUI SE ACTIVA EL BOTON ITAU Y SE ESCONDEN LOS DEMAS ---
    if (btnItau) { btnItau.style.display = 'inline-block'; }
    toggleOtrosMecanismosItau(true);
    dataItau = dataItau.sort((a, b) => {
        const diasA = parseFloat(a.DiasMoraObl) || 0;
        const diasB = parseFloat(b.DiasMoraObl) || 0;
        return diasB - diasA;
    });
    setFieldValue('ee828c1e-273d-4f48-80bd-270064a1593c', dataItau[0].NombreCompleto || "");
    setFieldValue('0a77d0fe-8905-4eb4-802b-ba7387e418e7', dataItau[0].Identificacion || "");
    setFieldValue('0eeacfd7-2ac4-408f-baa7-a560adc18f7e', dataItau[0].TipoDoc || "");
    setFieldValue('09dc2f41-1420-4a56-ac13-67b205362d4d', dataItau[0].CapitalTotalCl || "");

    // --- Resolver nombres de linea (evitando consultar el mismo codigo repetidas veces) ---
    const codigosLinea = [...new Set(dataItau.map(item => item.CustomChar2).filter(Boolean))];
    const mapaLineas = {};
    for (const codigo of codigosLinea) {
        try {
            const qLinea = "SELECT NomProductos FROM SimiladorDNC_Lappiz_LineaProducto WHERE CodCodigo = '" + codigo + "'";
            const rLinea = await execQuery(qLinea);
            if (rLinea && rLinea[0] && rLinea[0][0]) {
                mapaLineas[codigo] = rLinea[0][0].NomProductos;
            } else {
                mapaLineas[codigo] = codigo;
            }
        } catch (eL) {
            console.error("Error cargando linea:", eL);
            mapaLineas[codigo] = codigo;
        }
    }

    // Guardamos el estado para poder redibujar al cambiar de vista sin recalcular nada
    const state = getItauState();
    state.data = dataItau;
    state.mapaLineas = mapaLineas;
    state.vista = 'cards';
    actualizarTextoBotonVista();

    renderConsolidacionItau();

    // se restauran los demas botones para que no queden escondidos cuando el agente vuelva a Principal
    toggleOtrosMecanismosItau(false);
}

// ---------- Dispatcher: decide si pinta cards o tabla ----------
function renderConsolidacionItau() {
    const consolidacionDiv = document.getElementById("consolidacionitahu");
    if (!consolidacionDiv) return;
    const state = getItauState();
    consolidacionDiv.innerHTML = "";
    if (!state.data || state.data.length === 0) return;

    if (state.vista === 'tabla') {
        renderTablaItau(consolidacionDiv, state.data, state.mapaLineas);
    } else {
        renderCardsItau(consolidacionDiv, state.data, state.mapaLineas);
    }
}

// ---------- Vista Cards ----------
function renderCardsItau(consolidacionDiv, dataItau, mapaLineas) {
    consolidacionDiv.classList.remove('vista-tabla');
    consolidacionDiv.classList.add('vista-cards');
    dataItau.forEach((item) => {
        const card1itahu = document.createElement("div");
        card1itahu.className = "card1itahu";
        const title = document.createElement("h3");
        title.textContent = `Obligacion: ${item.Obligacion}`;
        card1itahu.appendChild(title);
        const fieldsGrid = document.createElement("div");
        fieldsGrid.className = "fields-grid";
        const nombreLinea = mapaLineas[item.CustomChar2] || item.CustomChar2;
        const fields = getItauFields(item, nombreLinea);
        fields.forEach((field) => {
            const fieldContainer = document.createElement("div");
            fieldContainer.className = "field-container";
            const label = document.createElement("label");
            label.textContent = field.label;
            const value = document.createElement("div");
            value.className = "value-box";
            value.textContent = field.isMoney ? formatMoney(field.value) : (field.value ?? "");
            fieldContainer.appendChild(label);
            fieldContainer.appendChild(value);
            fieldsGrid.appendChild(fieldContainer);
        });
        card1itahu.appendChild(fieldsGrid);
        consolidacionDiv.appendChild(card1itahu);
    });
}

// ---------- Vista Tabla ----------
function renderTablaItau(consolidacionDiv, dataItau, mapaLineas) {
    consolidacionDiv.classList.remove('vista-cards');
    consolidacionDiv.classList.add('vista-tabla');

    const wrapper = document.createElement("div");
    wrapper.className = "tabla-itau-wrapper";

    const table = document.createElement("table");
    table.className = "tabla-itau";

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    const thObl = document.createElement("th");
    thObl.textContent = "Obligacion";
    headRow.appendChild(thObl);

    const nombreLinea0 = mapaLineas[dataItau[0].CustomChar2] || dataItau[0].CustomChar2;
    getItauFields(dataItau[0], nombreLinea0).forEach(f => {
        const th = document.createElement("th");
        th.textContent = f.label;
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    dataItau.forEach(item => {
        const nombreLinea = mapaLineas[item.CustomChar2] || item.CustomChar2;
        const fields = getItauFields(item, nombreLinea);
        const row = document.createElement("tr");
        const tdObl = document.createElement("td");
        tdObl.textContent = item.Obligacion ?? "";
        row.appendChild(tdObl);
        fields.forEach(field => {
            const td = document.createElement("td");
            td.textContent = field.isMoney ? formatMoney(field.value) : (field.value ?? "");
            if (field.isMoney) td.classList.add('td-money');
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    wrapper.appendChild(table);
    consolidacionDiv.appendChild(wrapper);
}

// ---------- Control del boton de cambio de vista ----------
function actualizarTextoBotonVista() {
    const texto = document.getElementById("viewText");
    if (!texto) return;
    const state = getItauState();
    texto.textContent = (state.vista === 'cards') ? "Visualizar en Tabla" : "Visualizar en Cards";
}

function cambiarVista() {
    const state = getItauState();
    if (!state.data || state.data.length === 0) return;
    state.vista = (state.vista === 'cards') ? 'tabla' : 'cards';
    actualizarTextoBotonVista();
    renderConsolidacionItau();
}

function formatMoney(value) {
    if (value === null || value === undefined || value === "") return "";
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return num.toLocaleString("es-CO");
}

function triggerContingencia() {
    // llamdo de la vista de contingencia
    console.log("contingencia itau");
    document.getElementById('0ef0d484-3e3e-419d-aa65-d4610869f75e_create').click();
}