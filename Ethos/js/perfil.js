function guardarFormulario() {
    // Obtener los valores de los campos del formulario
    var nombre = document.getElementById('nombre-nutriologo').value;
    var edad = document.getElementById('edad').value;
    var sexo = document.getElementById('sexo').value;
    var correo = document.getElementById('correo').value;
    var telefono = document.getElementById('telefono').value;
    var cedula = document.getElementById('cedula').value;
    var especializacion = document.getElementById('especializacion').value;
    var experiencia = document.getElementById('experiencia').value;
    var centroTrabajo = document.getElementById('centro-trabajo').value;
    var horarios = document.getElementById('horarios').value;
    var modalidades = document.getElementById('modalidades').value;
    var descripcion = document.getElementById('descripcion').value;
    var historial = document.getElementById('historial').value;

    // Mostrar los valores en la consola
    console.log("Nombre de Nutriólogo:", nombre);
    console.log("Edad:", edad);
    console.log("Sexo:", sexo);
    console.log("Correo Electrónico:", correo);
    console.log("Número de Teléfono:", telefono);
    console.log("Cédula Profesional:", cedula);
    console.log("Especialización:", especializacion);
    console.log("Experiencia Laboral:", experiencia);
    console.log("Centro de Trabajo:", centroTrabajo);
    console.log("Horarios de Atención:", horarios);
    console.log("Modalidades de Consulta:", modalidades);
    console.log("Descripción Profesional:", descripcion);
    console.log("Historial de Pacientes:", historial);
}