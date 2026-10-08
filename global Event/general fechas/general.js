const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes comienza desde 0
const day = String(today.getDate()).padStart(2, '0');
sessionStorage.date = `${day}/${month}/${year}`

let date = sessionStorage.date || '';
const partesFecha = String(date).trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

if (partesFecha) {
    const dia = Number(partesFecha[1]);
    const mes = Number(partesFecha[2]);
    const anio = Number(partesFecha[3]);
    const fechaValidada = new Date(Date.UTC(anio, mes - 1, dia));

    if (fechaValidada.getUTCFullYear() === anio &&
        fechaValidada.getUTCMonth() === mes - 1 &&
        fechaValidada.getUTCDate() === dia) {
        date = anio + '-' + String(mes).padStart(2, '0') + '-' + String(dia).padStart(2, '0');
    }
}
sessionStorage.setItem('dateExep', date);