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
const auth = firebase.auth();
const db = firebase.firestore();

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
document.getElementById('logoutBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Previene la acción por defecto del enlace
    
    auth.signOut().then(() => {
        // Limpiar localStorage
        localStorage.removeItem('userEmail');
        
        // Redirigir a la página de inicio de sesión
        window.location.href = 'inicio_de_sesion.html';
    }).catch((error) => {
        console.error('Error al cerrar sesión:', error);
    });
});

// Verificación en cada carga de página
auth.onAuthStateChanged((user) => {
    if (!user) {
        // Redirigir a la página de inicio de sesión si no está autenticado
        window.location.href = 'inicio_de_sesion.html';
    }
});

window.addEventListener('popstate', function(event) {
    auth.onAuthStateChanged((user) => {
        if (!user) {
            // Redirigir a la página de inicio de sesión si no está autenticado
            window.location.href = 'inicio_de_sesion.html';
        }
    });
});
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// Edición y envío de datos
document.addEventListener('DOMContentLoaded', function () {
    // Inicializa las pestañas
    var tabList = document.querySelectorAll('#RutinaEjercicioTabs a');
    tabList.forEach(function (tab) {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            var tabPaneList = document.querySelectorAll('.tab-pane');
            tabPaneList.forEach(function (pane) {
                pane.classList.remove('show', 'active');
            });
            target.classList.add('show', 'active');
        });
    });

    // Listener para mostrar el modal
    const modal = document.getElementById('editRutinaEjercicio');
    modal.addEventListener('show.bs.modal', function () {
        cargarRutinaEjercicio();
    });

    // Habilitar el botón de guardar cuando se hace clic en la pestaña domingo-tabPes
    const domingoTab = document.getElementById('domingo-tabPes');
    const saveButton = document.getElementById('guardar-rutina-ejercicio-personalizada');

    domingoTab.addEventListener('click', function () {
        console.log('Pestaña domingo-tabPes clickeada');  // Log para depuración
        saveButton.disabled = false;
    });

    // Evento para el botón guardar
    saveButton.addEventListener('click', function () {
        console.log('Botón guardar presionado');  // Log para depuración
        guardarRutinaEjercicioPersonalizada();
    });
    
    const noexpafilInput = document.getElementById('Noexpafil');
    noexpafilInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evitar el comportamiento por defecto del Enter
            cargarRutinaEjercicio();
        }
    });
});

function actualizarRutinaEjer(dia, data) {
    console.log(`Actualizando rutina para ${dia}...`);
    if (data) {
        document.getElementById(`rutina-${dia}`).innerHTML = `<strong>Rutina:</strong> ${data.ejercicio.rutina} (${data.ejercicio.tiempo} minutos)`;
    } else {
        console.log(`Datos no encontrados para ${dia}`);
    }
}

async function cargarRutinaEjercicio() {
    const noexpafil = document.getElementById('Noexpafil').value;

    if (!noexpafil) {
        alert('Por favor, ingrese el número de expediente (Noexpafil).');
        return;
    }

    try {
        const userSnapshot = await firebase.firestore()
            .collection('users')
            .where('Noexpafil', '==', noexpafil)
            .get();

        if (userSnapshot.empty) {
            alert('No existe un paciente con ese número de expediente.');
            document.getElementById('Nombredelplan').textContent = ''; // Limpiar el nombre y apellido
            limpiarDatosRutina(); // Limpiar los datos de la rutina de ejercicio
            return;
        }

        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        const nombreCompleto = `${userData.Nombre} ${userData.Apellido}`; // Asumiendo que tienes los campos Nombre y Apellido

        // Mostrar el Nombre y Apellido en el <p>
        document.getElementById('Nombredelplan').textContent = nombreCompleto;

        const userId = userDoc.id;
        const rutinaRef = firebase.firestore()
            .collection('users')
            .doc(userId)
            .collection('rutina_ejercicio');

        const rutinaSnapshot = await rutinaRef.get();

        // Limpiar los datos de la rutina de ejercicio antes de actualizar
        limpiarDatosRutina();

        if (rutinaSnapshot.empty) {
            console.log('No se encontró la rutina de ejercicio para este paciente.');
            return;
        } else {
            rutinaSnapshot.forEach(doc => {
                const dia = doc.id;
                actualizarRutinaEjer(dia, doc.data());
            });
        }
    } catch (error) {
        console.error('Error al buscar la rutina de ejercicio:', error);
        alert('Ocurrió un error al buscar la rutina de ejercicio. Por favor, intente nuevamente.');
    }
}

function limpiarDatosRutina() {
    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

    dias.forEach(dia => {
        document.getElementById(`rutina-${dia}`).innerHTML = '';
    });
}

async function guardarRutinaEjercicioPersonalizada() {
    const noexpafil = document.getElementById('Noexpafil').value;

    if (!noexpafil) {
        alert('Por favor, ingrese el número de expediente (Noexpafil).');
        return;
    }

    try {
        const userSnapshot = await firebase.firestore()
            .collection('users')
            .where('Noexpafil', '==', noexpafil)
            .get();

        if (userSnapshot.empty) {
            alert('No se encontró un paciente con ese número de expediente.');
            return;
        }

        const userId = userSnapshot.docs[0].id;
        const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

        const batch = firebase.firestore().batch();

        dias.forEach(dia => {
            // Capturar los valores de los inputs
            const rutinaEjercicio = document.getElementById(`${dia}-desayuno-alimento`).value;
            const rutinaTiempo = parseInt(document.getElementById(`${dia}-desayuno-calorias`).value);

            // Agregar logs para depuración
            console.log(`Datos capturados para ${dia}:`);
            console.log('Ejercicio:', rutinaEjercicio, 'Tiempo:', rutinaTiempo);

            // Crear el documento en Firestore
            const diaRef = firebase.firestore()
                .collection('users')
                .doc(userId)
                .collection('rutina_ejercicio')
                .doc(dia);

            batch.set(diaRef, {
                ejercicio: {
                    rutina: rutinaEjercicio,
                    tiempo: rutinaTiempo
                }
            });
        });

        await batch.commit();
        alert('Rutina de ejercicio personalizada guardada correctamente.');
        actualizarRutinaEjer(dia, doc.data());
    } catch (error) {
        console.error('Error al guardar la rutina de ejercicio personalizada:', error);
        console.error('Ocurrió un error al guardar la rutina de ejercicio personalizada. Por favor, intente nuevamente.', error);
    }
}

document.getElementById('buscar-rutina').addEventListener('click', function () {
    cargarRutinaEjercicio();
});