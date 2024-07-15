$(document).ready(function() {
    $('.available-time').on('click', function() {
        $('.available-time').removeClass('active');
        $(this).addClass('active');
    });

    $('#save-changes').on('click', function() {
        var newDate = $('#new-date').val();
        var newTime = $('.available-time.active').data('time');
        
        if (newDate && newTime) {
            $('#scheduled-appointment').text(newDate + ' ' + newTime);
            $('#exampleModal').modal('hide'); // Asegúrate de que el ID del modal es correcto
        } else {
            alert('Por favor selecciona una fecha y un horario.');
        }
    });
});
