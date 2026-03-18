function syncObservationsWithSox() {

  const OBSERVATION_SOX_MAP = [
    { obs: 'be70a202-71a9-40ea-851b-945702693b51', sox: 'f3979225-f563-48a2-a206-6b5866a7dc6c' },
    { obs: '637cda5e-a8da-499a-98be-564521dd6c25', sox: '07b4e087-95c8-4867-b91f-1f9e9a4a1ea0' },
    { obs: '96c93177-4705-4bd2-ac50-e304c007afa3', sox: 'b24357e4-d1be-443d-8fa0-5b8790a1c508' },
    { obs: '24e68f6c-b401-40d9-bb2d-ec6d246426f9', sox: 'd4f89a7c-0207-4756-9bd7-e2e669ac3ce0' },
    { obs: '68d8ce24-c9fd-440b-995a-7ff027f628b6', sox: 'eec3136d-46bf-438c-b7cc-4aaa5fba776b' }
  ];

  const MAX_SOX_LENGTH = 1100;

  OBSERVATION_SOX_MAP.forEach(({ sox, obs }) => {

    const soxField = document.getElementById(sox);
    const obsField = document.getElementById(obs);
    if (!soxField || !obsField) return;

    const counter = soxField.parentElement.querySelector('.sox-counter');
    if (!counter) return;

    const soxValue = (getFieldValue(sox) || '').toUpperCase();
    const length = soxValue.length;

    // inicializar último valor válido
    if (obsField.dataset.lastValue === undefined) {
      obsField.dataset.lastValue = obsField.value || '';
    }

    // contador
    counter.innerText = `${length} / ${MAX_SOX_LENGTH}`;

    if (length >= MAX_SOX_LENGTH) {

      counter.style.color = '#dc3545';
      counter.style.fontWeight = '600';

      obsField.style.border = '1px solid #dc3545';

      // listener UNA sola vez
      if (!obsField.dataset.locked) {
        obsField.addEventListener('input', (event) => {

          const currentSox = (getFieldValue(sox) || '').toUpperCase();
          if (currentSox.length < MAX_SOX_LENGTH) return;

          //  bloquear solo inserciones
          if (
            event.inputType === 'insertText' ||
            event.inputType === 'insertFromPaste'
          ) {
            obsField.value = obsField.dataset.lastValue;
            toastr.warning(
              'Has alcanzado el límite máximo de caracteres permitido por el SOX.'
            );
          } else {
            //  permitir borrar
            obsField.dataset.lastValue = obsField.value;
          }
        });

        obsField.dataset.locked = 'true';
      }

    } else {
      //  estado normal
      obsField.dataset.lastValue = obsField.value;
      obsField.style.border = '';

      counter.style.color = '#6c757d';
      counter.style.fontWeight = 'normal';
    }

  });

}

