function ReflejarSoxAmpliacion() {
    let observaciones =
        getFieldValue('68d8ce24-c9fd-440b-995a-7ff027f628b6') || '';

    let plantillaSOX =
        getFieldValue('eec3136d-46bf-438c-b7cc-4aaa5fba776b') || '';

    if (!plantillaSOX) return;

    // Reemplaza solo el bloque de observaciones dentro del SOX
    plantillaSOX = plantillaSOX.replace(
        /LLLOBSERVACIONESXX[\s\S]*?LLL/,
        `LLLOBSERVACIONESXX${observaciones}LLL`
    );

    setFieldValue('eec3136d-46bf-438c-b7cc-4aaa5fba776b', plantillaSOX);
}