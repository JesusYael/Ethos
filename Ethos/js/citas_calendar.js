$(document).ready(function () {
    // Fechas reservadas (ejemplo)
    var reservedDates = [
        { title: 'Reservado', start: '2024-07-10' },
        { title: 'Reservado', start: '2024-07-15' }
    ];

    // Inicializar el calendario
    $('#calendar').fullCalendar({
        selectable: true,
        selectHelper: true,
        events: reservedDates,
        select: function (start, end) {
            var title = 'Reservado';
            var eventData;
            if (title) {
                eventData = {
                    title: title,
                    start: start,
                    end: end
                };
                $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
            }
            $('#calendar').fullCalendar('unselect');
        }
    });

    // Guardar las fechas seleccionadas
    $('#saveDates').click(function () {
        var events = $('#calendar').fullCalendar('clientEvents');
        var dates = events.map(event => event.start.format('YYYY-MM-DD'));
        alert('Fechas seleccionadas: ' + dates.join(', '));
        // Aquí puedes agregar lógica para guardar las fechas en tu backend
    });
});
