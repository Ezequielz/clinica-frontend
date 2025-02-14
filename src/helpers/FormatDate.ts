function fechaLegible(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    
    const opciones: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

    // Separar los componentes de la fecha
    const partes = fechaFormateada.split(' de ');
    const dia = partes[0];
    const mes = partes[1].charAt(0).toUpperCase() + partes[1].slice(1); // Capitalizar mes
    const año = partes[2];

    return `${dia} de ${mes} del ${año}`;
}


function stringToDate(fechaStr: string): Date {
    const [year, month, day] = fechaStr.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function DateToString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}


// 'YYYY-MM-DD' pasarlo a 'DD-MM-YYYY'
function reverse(fecha: string): string {
    const [year, month, day] = fecha.split('-');
    return `${day}-${month}-${year}`;
}


export const formatDate = {
    fechaLegible,
    stringToDate,
    DateToString,
    reverse
}