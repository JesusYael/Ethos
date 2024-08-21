const firebaseConfig = {
    apiKey: "AIzaSyDYOnv_kYwnTv_r0OHSNrHEvlCdi2WZX94",
    authDomain: "ethosapp-4353b.firebaseapp.com",
    projectId: "ethosapp-4353b",
    storageBucket: "ethosapp-4353b.appspot.com",
    messagingSenderId: "280180054610",
    appId: "1:280180054610:web:0499a47a5fcbee64e85d8b",
    measurementId: "G-1PYWCTPJ2K"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Función para obtener el parámetro Noexpafil de la URL
function getNoexpafilFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('Noexpafil');
}

// Función para obtener los datos del paciente desde Firestore en la colección 'users'
async function getPacienteData(Noexpafil) {
    try {
        const snapshot = await db.collection('users').where('Noexpafil', '==', Noexpafil).get();
        if (snapshot.empty) {
            console.error('No se encontró el paciente con Noexpafil:', Noexpafil);
            return null;
        }
        return snapshot.docs[0].data();
    } catch (error) {
        console.error('Error al obtener los datos del paciente:', error);
        return null;
    }
}

// Función para obtener los datos del paciente desde Firestore en la colección 'Informacionpacientes'
async function getPacienteInfo(Noexpafil) {
    try {
        const snapshot = await db.collection('Informacionpacientes').where('Noexpafil', '==', Noexpafil).get();
        if (snapshot.empty) {
            console.log('No hay información previa para el paciente con Noexpafil:', Noexpafil);
            return null;
        }
        return snapshot.docs[0].data();
    } catch (error) {
        console.error('Error al obtener la información del paciente:', error);
        return null;
    }
}

// Función para obtener el nombre del expediente PDF desde Firebase Storage
async function getExpedienteName() {
    const Noexpafil = getNoexpafilFromURL();
    if (!Noexpafil) {
        console.error('Noexpafil no proporcionado en la URL');
        return;
    }

    const storageRef = storage.ref(`expedientes/${Noexpafil}.pdf`);
    try {
        // Verificar si el archivo existe
        await storageRef.getDownloadURL(); // Solo para verificar la existencia del archivo
        return Noexpafil + '.pdf'; // El nombre del archivo es Noexpafil + '.pdf'
    } catch (error) {
        console.error('Error al obtener el nombre del expediente:', error);
        return null;
    }
}

// Función para mostrar el nombre del expediente en el HTML
async function displayExpedienteName() {
    const expedienteName = await getExpedienteName();
    if (expedienteName) {
        document.getElementById('nombre_expediente').textContent = expedienteName;
    } else {
        document.getElementById('nombre_expediente').textContent = 'No hay expediente disponible.';
    }
}

// Función para mostrar los datos del paciente en el HTML
async function displayPacienteData() {
    const Noexpafil = getNoexpafilFromURL();
    if (!Noexpafil) {
        console.error('Noexpafil no proporcionado en la URL');
        return;
    }

    // Obtener y mostrar los datos básicos del paciente
    const pacienteData = await getPacienteData(Noexpafil);
    if (pacienteData) {
        const hora = `${pacienteData.hora}:00`
        document.getElementById('nombre').textContent = pacienteData.Nombre || '';
        document.getElementById('apellido').textContent = pacienteData.Apellido || '';
        document.getElementById('cita').textContent = pacienteData.cita  + ' ' + hora|| '';
    }

    // Obtener y mostrar la información adicional del paciente
    const pacienteInfo = await getPacienteInfo(Noexpafil);
    if (pacienteInfo) {
        document.getElementById('edad').value = pacienteInfo.Edad || '';
        document.getElementById('sexo').value = pacienteInfo.Sexo || '';
        document.getElementById('peso').value = pacienteInfo.Peso || '';
        document.getElementById('talla').value = pacienteInfo.Talla || '';
        document.getElementById('presion').value = pacienteInfo.Presion || '';
        document.getElementById('glucosa').value = pacienteInfo.Glucosa || '';
        document.getElementById('enfermedades').value = pacienteInfo.Enfermedades || '';
        document.getElementById('imc').value = pacienteInfo.IMC || '';
        document.getElementById('avances').value = pacienteInfo.Avances || '';
    }

    // Mostrar el nombre del expediente
    await displayExpedienteName();
}

// Función para calcular el IMC y mostrarlo en el campo correspondiente
document.getElementById('calculoIMC').addEventListener('click', function() {
    const talla = parseFloat(document.getElementById('talla').value);
    const peso = parseFloat(document.getElementById('peso').value);
    
    if (!isNaN(talla) && !isNaN(peso) && talla > 0) {
        const imc = peso / (talla * talla);
        document.getElementById('imc').value = imc.toFixed(2);
    } else {
        alert('Por favor ingrese valores válidos para la talla y el peso.');
    }
});

// Función para guardar la información del paciente en la colección Informacionpacientes
async function savePacienteInfo() {
    const Noexpafil = getNoexpafilFromURL();
    if (!Noexpafil) {
        console.error('Noexpafil no proporcionado en la URL');
        return;
    }

    const nombre = document.getElementById('nombre').textContent;
    const apellido = document.getElementById('apellido').textContent;
    const edad = document.getElementById('edad').value;
    const sexo = document.getElementById('sexo').value;
    const peso = document.getElementById('peso').value;
    const talla = document.getElementById('talla').value;
    const presion = document.getElementById('presion').value;
    const glucosa = document.getElementById('glucosa').value;
    const enfermedades = document.getElementById('enfermedades').value;
    const imc = document.getElementById('imc').value;
    const avances = document.getElementById('avances').value;

    try {
        await db.collection('Informacionpacientes').add({
            Noexpafil,
            Nombre: nombre,
            Apellido: apellido,
            Edad: edad,
            Sexo: sexo,
            Peso: peso,
            Talla: talla,
            Presion: presion,
            Glucosa: glucosa,
            Enfermedades: enfermedades,
            IMC: imc,
            Avances: avances
        });
        alert('Información guardada exitosamente');
    } catch (error) {
        console.error('Error al guardar la información del paciente:', error);
        alert('Hubo un error al guardar la información. Por favor, inténtelo de nuevo.');
    }
}

async function getPacienteDocRef(Noexpafil) {
    try {
        const snapshot = await db.collection('Informacionpacientes').where('Noexpafil', '==', Noexpafil).get();
        if (snapshot.empty) {
            console.log('No hay información previa para el paciente con Noexpafil:', Noexpafil);
            return null;
        }
        return snapshot.docs[0].ref; // Devuelve la referencia del documento
    } catch (error) {
        console.error('Error al obtener la referencia del documento del paciente:', error);
        return null;
    }
}
// Función para subir un expediente PDF a Firebase Storage y actualizar la URL en Firestore
async function uploadExpediente() {
    const fileInput = document.getElementById('formFile');
    const file = fileInput.files[0];
    if (!file || !file.name.endsWith('.pdf')) {
        alert('Por favor, seleccione un archivo PDF.');
        return;
    }

    const Noexpafil = getNoexpafilFromURL();
    if (!Noexpafil) {
        console.error('Noexpafil no proporcionado en la URL');
        return;
    }

    const storageRef = storage.ref(`expedientes/${Noexpafil}.pdf`);
    try {
        // Subir el archivo a Firebase Storage
        await storageRef.put(file);
        const url = await storageRef.getDownloadURL();

        // Obtener la referencia del documento del paciente
        const docRef = await getPacienteDocRef(Noexpafil);
        if (docRef) {
            // Actualizar el documento con la URL del expediente
            await docRef.update({ expedienteURL: url });
            alert('Expediente subido y vinculado exitosamente.');
        } else {
            console.error('No se encontró el documento del paciente para actualizar la URL.');
        }
    } catch (error) {
        console.error('Error al subir el expediente:', error);
        alert('Hubo un error al subir el expediente. Por favor, inténtelo de nuevo.');
    }
}

// Evento para subir el expediente cuando se hace clic en el botón
document.getElementById('uploadExpediente').addEventListener('click', uploadExpediente);

// Función para eliminar el expediente PDF de Firebase Storage y vaciar la URL en Firestore
async function deleteExpediente() {
    const Noexpafil = getNoexpafilFromURL();
    if (!Noexpafil) {
        console.error('Noexpafil no proporcionado en la URL');
        return;
    }

    const storageRef = storage.ref(`expedientes/${Noexpafil}.pdf`);
    try {
        // Eliminar el archivo del almacenamiento de Firebase
        await storageRef.delete();
        console.log('Expediente eliminado de Firebase Storage.');

        // Obtener la referencia del documento del paciente
        const docRef = await getPacienteDocRef(Noexpafil);
        if (docRef) {
            // Vaciar el campo expedienteURL en el documento
            await docRef.update({ expedienteURL: '' });
            alert('Expediente eliminado y URL actualizada exitosamente.');
        } else {
            console.error('No se encontró el documento del paciente para actualizar la URL.');
        }
    } catch (error) {
        console.error('Error al eliminar el expediente:', error);
        alert('Hubo un error al eliminar el expediente. Por favor, inténtelo de nuevo.');
    }
}

// Evento para eliminar el expediente cuando se hace clic en el botón
document.getElementById('deleteExpediente').addEventListener('click', deleteExpediente);

// Función para obtener el parámetro Noexpafil de la URL
function getNoexpafilFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('Noexpafil');
}

// Función para actualizar el campo tipopaciente en el documento correspondiente en la colección 'users'
async function updateTipoPaciente() {
    const Noexpafil = getNoexpafilFromURL();
    if (!Noexpafil) {
        console.error('Noexpafil no proporcionado en la URL');
        return;
    }

    try {
        // Obtener el documento del paciente desde Firestore
        const snapshot = await db.collection('users').where('Noexpafil', '==', Noexpafil).get();
        if (snapshot.empty) {
            console.error('No se encontró el paciente con Noexpafil:', Noexpafil);
            return;
        }

        // Obtener la referencia del documento
        const docRef = snapshot.docs[0].ref;

        // Actualizar el campo tipopaciente
        await docRef.update({ tipopaciente: 'Paciente' });

        // Buscar y actualizar el documento en la colección Citaspacientes
        const citasSnapshot = await db.collection('Citaspacientes').where('Noexpafil', '==', Noexpafil).get();
        if (!citasSnapshot.empty) {
            // Actualizar el campo Asistencia en todos los documentos que coincidan
            citasSnapshot.forEach(async (doc) => {
                await doc.ref.update({ Asistencia: 'si' });
            });
        } else {
            console.warn('No se encontró ninguna cita para el paciente con Noexpafil:', Noexpafil);
        }

        alert('Paciente y cita actualizados exitosamente.');
    } catch (error) {
        console.error('Error al actualizar al paciente o la cita:', error);
        alert('Hubo un error al actualizar al paciente o la cita. Por favor, inténtelo de nuevo.');
    }
}

// Evento para manejar el clic del botón 'Aceptar'
document.getElementById('aceptarBtn').addEventListener('click', updateTipoPaciente);

// Función para guardar o actualizar la información del paciente en la colección 'Informacionpacientes'
async function guardarInformacion() {
    const Noexpafil = getNoexpafilFromURL();
    if (!Noexpafil) {
        console.error('Noexpafil no proporcionado en la URL');
        return;
    }

    const nombre = document.getElementById('nombre').textContent;
    const apellido = document.getElementById('apellido').textContent;
    const edad = document.getElementById('edad').value;
    const sexo = document.getElementById('sexo').value;
    const peso = document.getElementById('peso').value;
    const talla = document.getElementById('talla').value;
    const presion = document.getElementById('presion').value;
    const glucosa = document.getElementById('glucosa').value;
    const enfermedades = document.getElementById('enfermedades').value;
    const imc = document.getElementById('imc').value;
    const avances = document.getElementById('avances').value;

    try {
        // Obtener la referencia del documento del paciente
        const docRef = await getPacienteDocRef(Noexpafil);
        if (docRef) {
            // Actualizar el documento con la nueva información
            await docRef.update({
                Nombre: nombre,
                Apellido: apellido,
                Edad: edad,
                Sexo: sexo,
                Peso: peso,
                Talla: talla,
                Presion: presion,
                Glucosa: glucosa,
                Enfermedades: enfermedades,
                IMC: imc,
                Avances: avances
            });
            alert('Información actualizada exitosamente.');
        } else {
            // Si no existe el documento, crear uno nuevo
            await db.collection('Informacionpacientes').add({
                Noexpafil,
                Nombre: nombre,
                Apellido: apellido,
                Edad: edad,
                Sexo: sexo,
                Peso: peso,
                Talla: talla,
                Presion: presion,
                Glucosa: glucosa,
                Enfermedades: enfermedades,
                IMC: imc,
                Avances: avances
            });
            alert('Información guardada exitosamente.');
        }
    } catch (error) {
        console.error('Error al guardar la información del paciente:', error);
        alert('Hubo un error al guardar la información. Por favor, inténtelo de nuevo.');
    }
}

// Evento para guardar la información cuando se hace clic en el botón
document.getElementById('guardarInformacion').addEventListener('click', guardarInformacion);

// Función para obtener Noexpafil de la URL
function getNoexpafilFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('Noexpafil');
}

// Función para obtener el nombre del paciente desde la colección Informacionpacientes
async function getPacienteNombre(Noexpafil) {
    try {
        const snapshot = await db.collection('Informacionpacientes').where('Noexpafil', '==', Noexpafil).get();
        if (snapshot.empty) {
            console.log('No hay información previa para el paciente con Noexpafil:', Noexpafil);
            return null;
        }
        const pacienteData = snapshot.docs[0].data();
        return pacienteData.Nombre || 'Nombre no disponible'; // Cambia 'nombre' por el campo correcto si es necesario
    } catch (error) {
        console.error('Error al obtener el nombre del paciente:', error);
        return null;
    }
}

// Evento que se ejecuta cuando el documento está completamente cargado
document.addEventListener('DOMContentLoaded', async function() {
    const Noexpafil = getNoexpafilFromURL();
    if (Noexpafil) {
        console.log('Noexpafil:', Noexpafil);

        // Obtener el Nombre del paciente y exportarlo
        const Nombre = await getPacienteNombre(Noexpafil);
        if (Nombre) {
            console.log('Nombre del paciente:', Nombre);
            // Almacenar en localStorage
            localStorage.setItem('Noexpafil', Noexpafil);
            localStorage.setItem('Nombre', Nombre);
        } else {
            console.error('No se pudo obtener el nombre del paciente.');
        }
    } else {
        console.error('Noexpafil no encontrado en la URL');
    }
});

document.getElementById('rechazar').addEventListener('click', async function() {
    const Noexpafil = getNoexpafilFromURL();
    if (!Noexpafil) {
        console.error('Noexpafil no proporcionado en la URL');
        return;
    }

    try {
        // Buscar y actualizar el documento en la colección Citaspacientes
        const citasSnapshot = await db.collection('Citaspacientes').where('Noexpafil', '==', Noexpafil).get();
        if (!citasSnapshot.empty) {
            // Actualizar el campo Asistencia en todos los documentos que coincidan
            citasSnapshot.forEach(async (doc) => {
                await doc.ref.update({ Asistencia: 'no' });
            });
        } else {
            console.warn('No se encontró ninguna cita para el paciente con Noexpafil:', Noexpafil);
        }

        // Mostrar el modal
        const modal = document.getElementById('reagendarModal');
        modal.style.display = 'block';

        // Manejar los botones del modal
        document.getElementById('reagendarAhora').addEventListener('click', function() {
            window.location.href = 'citas.html';
        });

        document.getElementById('reagendarDespues').addEventListener('click', function() {
            modal.style.display = 'none';
        });

    } catch (error) {
        console.error('Error al actualizar la cita:', error);
        alert('Hubo un error al actualizar la cita. Por favor, inténtelo de nuevo.');
    }
});

// Cerrar el modal cuando se hace clic fuera de él
window.addEventListener('click', function(event) {
    const modal = document.getElementById('reagendarModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Mostrar los datos del paciente al cargar la página
displayPacienteData();