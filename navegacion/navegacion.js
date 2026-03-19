setTimeout(function () {
    delete sessionStorage.campanamora
    NombreGrupo()

    //desactivar campos Int extracontables
    disableField('921ccf29-1680-4f33-9f4d-613a7b2e5b78', true)
    disableField('8875c8f6-f9e5-42fa-b1aa-acf2e6623d70', true)
    disableField('05bd1cf1-9eb8-48f7-b60c-6158f9ba11d8', true)
    disableField('8e599026-4bf0-4a1e-9cb6-20c1a641a915', true)
    disableField('4170bf5b-c797-4c78-ad59-89d4bad60ec9', true)
    disableField('92fe640e-4571-49e7-8fce-4f714888f307', true)
}, 500);
const VISTAS = {
    PRINCIPAL: 1,

    NOVACIONES_P1: 2,
    NOVACIONES_P2: 3,

    AMPLIACION_P1: 4,
    AMPLIACION_P2: 16,
    AMPLIACION_P3: 7,

    CANCELACION_TOTAL_PAG1: 5,
    CANCELACION_P2: 6,
    CANCELACION_P3: 12,

    CONSOLIDACION_P1: 14,
    CONSOLIDACION_P2: 9,
    CONSOLIDACION_P3: 11,
    CONSOLIDACION_P4: 8,

    PAGO_MORA_P1: 15,
    PAGO_MORA_P2: 10,

    INFORMACION_CLIENTE: 13
};

const OBSERVATION_SOX_MAP = [
  { obs: 'be70a202-71a9-40ea-851b-945702693b51', sox: 'f3979225-f563-48a2-a206-6b5866a7dc6c' },
  { obs: '96c93177-4705-4bd2-ac50-e304c007afa3', sox: '07b4e087-95c8-4867-b91f-1f9e9a4a1ea0' },
  { obs: '24e68f6c-b401-40d9-bb2d-ec6d246426f9', sox: 'b24357e4-d1be-443d-8fa0-5b8790a1c508' },
  { obs: '68d8ce24-c9fd-440b-995a-7ff027f628b6', sox: 'eec3136d-46bf-438c-b7cc-4aaa5fba776b' },
  { obs: '637cda5e-a8da-499a-98be-564521dd6c25', sox: 'd4f89a7c-0207-4756-9bd7-e2e669ac3ce0' }
];
const MAX_SOX_LENGTH = 1100;
function syncSoxCounter() {

  OBSERVATION_SOX_MAP.forEach(({ sox }) => {
    const soxField = document.getElementById(sox);
    if (!soxField) return;

    const container = soxField.parentElement;

    let counter = container.querySelector('.sox-counter');
    if (!counter) {
      counter = document.createElement('div');
      counter.className = 'sox-counter';
      counter.style.fontSize = '14px';
      counter.style.textAlign = 'right';
      counter.style.color = '#6c757d';
      counter.style.backgroundColor = '#ffffff';
      container.appendChild(counter);
    }

    const initialValue = (getFieldValue(sox) || '').toUpperCase();
    counter.innerText = `${initialValue.length} / ${MAX_SOX_LENGTH}`;
  });

}


function scrollMecanismos() {
    setTimeout(() => {
        const options = { top: 0, left: 0, behavior: "smooth" };
        document.documentElement.scrollTo(options);
        document.body.scrollTo(options);
    }, 300);
}

function navegarA(vistaIndex) {
    const selector = `body > app-root > app-base > div > div > div > div 
    > app-forms > div > div > div > div > form > ul > li:nth-child(${vistaIndex}) > a`;

    const vista = document.querySelector(selector);

    if (!vista) {
        console.warn("Vista no encontrada:", vistaIndex);
        return;
    }

    vista.click();
    scrollMecanismos();
}

function inicializarNavegacion() {

    // Consolidacion de productos
    //Principal
    $(".consolidacion").click(() => {
        navegarA(VISTAS.CONSOLIDACION_P1);
        let cantidad = getFieldValue('0ab23e22-1c3c-4a43-8c58-207b83625867')
        if (cantidad > 0) {
            obligacionSinBaseConsolidacion(cantidad)
        }
    });

    $(".right-buttonC").click(() => {
        navegarA(VISTAS.CONSOLIDACION_P2);
        CalculosConsolidacion()
       
    });

    $(".left-buttonC").click(() => {
        navegarA(VISTAS.PRINCIPAL);

    });

    $(".right-buttonC2").click(() => {
        navegarA(VISTAS.CONSOLIDACION_P3);

    });

    $(".left-buttonC2").click(() => {
        navegarA(VISTAS.CONSOLIDACION_P1);
    });

    $(".right-buttonC3").click(() => {
        navegarA(VISTAS.CONSOLIDACION_P4);
        observacionConsolidado();
        syncSoxCounter();
    });

    $(".left-buttonC3").click(() => {
        navegarA(VISTAS.CONSOLIDACION_P2);
    });

    $(".right-buttonC4").click(() => {
        navegarA(VISTAS.INFORMACION_CLIENTE);

    });

    $(".left-buttonC4").click(() => {
        navegarA(VISTAS.CONSOLIDACION_P3);
    });
    $(".left-buttonInf").click(() => {
        navegarA(VISTAS.CONSOLIDACION_P4);
        observacionConsolidado();
        syncSoxCounter();
    });

    // NOVACIONES
    //Principal
    $(".novaciones").click(() => {
        navegarA(VISTAS.NOVACIONES_P1);
        disableField('4cbf2d64-0442-4c98-964f-e741a6a4e6a1', true)
        disableField('c6923383-8eec-4efe-81a5-954ce52b8882', true)
        disableField('d157fb29-fd6f-450b-b637-8fa18c824cd2', true)
        disableField('fad108db-d495-442a-9312-b681e86ac6ba', true)
        abono(getFieldValue('1f7c2b79-87a6-402f-95f2-414aea88a4bf'))
        tasaEspecial();
        obligacionCU(); 
    });
    $(".left-button").click(() => {
        navegarA(VISTAS.PRINCIPAL);

    });
    $(".right-button").click(() => {
        navegarA(VISTAS.NOVACIONES_P2);
        llenarCampos();
        // botton a sox
        syncSoxCounter();
    });
    $(".left-button2").click(() => {
        navegarA(VISTAS.NOVACIONES_P1);
    });
    $(".right-button2").click(() => {
        
        navegarA(VISTAS.INFORMACION_CLIENTE); 
    });
    $(".left-buttonInf").click(() => {
        navegarA(VISTAS.NOVACIONES_P2);
        llenarCampos();
        syncSoxCounter();
    });

    // PAGO MORA
    //Principal
    $(".pagomora").click(() => {
        navegarA(VISTAS.PAGO_MORA_P1);
    });
    $(".left-button").click(() => {
        navegarA(VISTAS.PRINCIPAL);
    });
    $(".right-buttonM").click(() => {
        navegarA(VISTAS.PAGO_MORA_P2);
        soxMora();
        syncSoxCounter();
    });
    $(".left-buttonM2").click(() => {
        navegarA(VISTAS.PAGO_MORA_P1);
    });
    $(".right-buttonM2").click(() => {
        navegarA(VISTAS.INFORMACION_CLIENTE);
    });
    $(".left-buttonInf").click(() => {
        navegarA(VISTAS.PAGO_MORA_P2);
        soxMora();
        syncSoxCounter();
         });

    // Cancelacion Total
    //Principal
    $(".cancelacion").click(() => {
        navegarA(VISTAS.CANCELACION_TOTAL_PAG1);
    });
    $(".right-buttonCA1").click(() => {
        navegarA(VISTAS.CANCELACION_P2);
        CancelacionSox();
        syncSoxCounter();
    });
    $(".left-buttonCA1").click(() => {
        navegarA(VISTAS.PRINCIPAL);
    });
    $(".right-buttonCA2").click(() => {
        navegarA(VISTAS.CANCELACION_P3);
    });
    $(".left-buttonCA2").click(() => {
        navegarA(VISTAS.CANCELACION_TOTAL_PAG1);
    });
    $(".left-buttonCA3").click(() => {
        navegarA(VISTAS.CANCELACION_P2);
    });
    $(".right-buttonCA3").click(() => {
        navegarA(VISTAS.INFORMACION_CLIENTE);
    });
    $(".left-buttonInf").click(() => {
        navegarA(VISTAS.CANCELACION_P3);
        CancelacionSox();
        syncSoxCounter();
    });

    // AMPLIACION
    //Principal
 
   $(".ampliacion").click(() => {
        navegarA(VISTAS.AMPLIACION_P1);
        let Int = getFieldValue('70101be7-9330-44e4-913c-e6772c5b8167')
        let mora = getFieldValue('aea118a4-8a99-4d3a-adf9-ffd5151db4f6')
        setFieldValue('70101be7-9330-44e4-913c-e6772c5b8167', Int)
        setFieldValue('aea118a4-8a99-4d3a-adf9-ffd5151db4f6', mora)
        aplicarCampanaAmpliacion();
    });
    
    $(".left-button").click(() => {
        navegarA(VISTAS.PRINCIPAL);
    });
    $(".right-buttonAM").click(() => {
        navegarA(VISTAS.AMPLIACION_P2);
    });

    $(".left-buttonAM2").click(() => {
        navegarA(VISTAS.AMPLIACION_P1);
    });

    $(".right-buttonAM2").click(() => {
        navegarA(VISTAS.AMPLIACION_P3);
        soxAmpliacion();
        syncSoxCounter();
    });

    $(".left-buttonAM3").click(() => {
        navegarA(VISTAS.AMPLIACION_P2);
    });

    $(".right-buttonAM3").click(() => {
        navegarA(VISTAS.INFORMACION_CLIENTE);
    });
    $(".left-buttonInf").click(() => {
        navegarA(VISTAS.AMPLIACION_P3);
        soxAmpliacion();
        syncSoxCounter();
    });
    //Botones Copiar Sox
    $(".copiar").click(() => {
        copiarTexto();
    });
    $(".copiar2").click(() => {
        copiarTexto2();
    });

    $(".copiar3").click(() => {
        copiarSoxM();
        caracters([{id:'b24357e4-d1be-443d-8fa0-5b8790a1c508'}]);
    });
    $(".copiar4").click(() => {
        copiarSoxA();
    });
    $(".copiarCA").click(() => {
        copiarTextoCA();
    });

}

setTimeout(() => {
    inicializarNavegacion()
},7000) 