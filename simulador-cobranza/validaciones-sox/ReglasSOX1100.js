const OBSERVATION_SOX_MAP = [
  { obs: 'be70a202-71a9-40ea-851b-945702693b51', sox: 'f3979225-f563-48a2-a206-6b5866a7dc6c' },
  { obs: '96c93177-4705-4bd2-ac50-e304c007afa3', sox: '07b4e087-95c8-4867-b91f-1f9e9a4a1ea0' },
  { obs: '24e68f6c-b401-40d9-bb2d-ec6d246426f9', sox: 'b24357e4-d1be-443d-8fa0-5b8790a1c508' },
  { obs: '68d8ce24-c9fd-440b-995a-7ff027f628b6', sox: 'eec3136d-46bf-438c-b7cc-4aaa5fba776b' },
  { obs: '637cda5e-a8da-499a-98be-564521dd6c25', sox: 'd4f89a7c-0207-4756-9bd7-e2e669ac3ce0' }
];

const MAX_SOX_LENGTH = 1100;

function syncObservationsWithSox() {

  OBSERVATION_SOX_MAP.forEach(({ obs, sox }) => {
    const soxField = document.getElementById(sox);
    const obsField = document.getElementById(obs);
    if (!obsField) return;

    let lastValidObs = obsField.value || '';

    // ===== contador visual =====
    //const container = obsField.parentElement;
    const soxContainer = soxField.parentElement;
    let counter = soxContainer.querySelector('.sox-counter');

    if (!counter) {
      counter = document.createElement('div');
      counter.className = 'sox-counter';
      counter.style.fontSize = '14px';
      counter.style.textAlign = 'right';
      counter.style.color = '#000000';
      counter.style.backgroundColor = "#ffffff";
      soxContainer.appendChild(counter);
    }

    obsField.addEventListener('input', () => {

      const obsValue = obsField.value;
      const soxValue = (getFieldValue(sox) || '').toUpperCase();
      const soxLength = soxValue.length;

      counter.innerText = `${soxLength} / ${MAX_SOX_LENGTH}`;

      //  si supera el límite del SOX
      if (soxLength >= MAX_SOX_LENGTH) {
        obsField.value = lastValidObs;
        obsField.style.border = '1px solid #dc3545';
        counter.style.color = '#dc3545';
        counter.style.fontWeight = '600';
        return;
      }

      lastValidObs = obsValue;

      obsField.style.border = '';
      counter.style.color = '#6c757d';
      counter.style.fontWeight = 'normal';
    });

    // estado inicial
    const initialSox = (getFieldValue(sox) || '').toUpperCase();
    counter.innerText = `${initialSox.length} / ${MAX_SOX_LENGTH}`;
  });
}
setTimeout(() => {
  syncObservationsWithSox();
}, 800);