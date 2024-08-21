// Configuración de Firebase
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


// Función para obtener el correo del usuario autenticado
async function getUserEmail() {
    const user = firebase.auth().currentUser;

    if (user) {
        const userEmail = user.email;
        console.log('Correo del usuario obtenido:', userEmail);
        localStorage.setItem('userEmail', userEmail);
        return userEmail;
    } else {
        console.log('No hay usuario conectado');
        return null;
    }
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Funcionalidad de cierre de sesión
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Previene la acción por defecto

        auth.signOut().then(() => {
            localStorage.removeItem('userEmail'); // Limpia localStorage
            window.location.href = 'inicio_de_sesion.html'; // Redirige a la página de inicio de sesión
        }).catch((error) => {
            console.error('Error al cerrar sesión:', error);
        });
    });
}

// Escucha cambios en el estado de autenticación
auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'inicio_de_sesion.html'; // Redirige si no está autenticado
    }
});

// Verificación de autenticación en la navegación del historial del navegador
window.addEventListener('popstate', function (event) {
    auth.onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = 'inicio_de_sesion.html'; // Redirige si no está autenticado
        }
    });
});
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//Edicion y envio de datos
document.addEventListener('DOMContentLoaded', function () {
    // Inicializa las pestañas
    var tabList = document.querySelectorAll('#myTab a');
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
    const modal = document.getElementById('editPlanPerdidadePeso');
    modal.addEventListener('show.bs.modal', function () {
        cargarPlanAlimenticio();
    });

    // Habilitar el botón de guardar cuando se hace clic en la pestaña domingo-tabPeso
    const domingoTab = document.getElementById('domingo-tabPeso');
    const saveButton = document.getElementById('guardar-plan-alimenticio-personalizado');

    domingoTab.addEventListener('click', function () {
        console.log('Pestaña domingo-tabPeso clickeada');  // Log para depuración
        saveButton.disabled = false;
    });

    // Evento para el botón guardar
    saveButton.addEventListener('click', function () {
        console.log('Botón guardar presionado');  // Log para depuración
        guardarPlanAlimenticioPersonalizado();
        actualizarPlanAliment();
    });
    
    const noexpafilInput = document.getElementById('Noexpafil');
    noexpafilInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evitar el comportamiento por defecto del Enter
            cargarPlanAlimenticio();
        }
    });
});

function actualizarPlanAliment(dia, data) {
    console.log(`Actualizando modal para ${dia}...`);
    if (data) {
        document.getElementById(`desayuno-${dia}`).innerHTML = `<strong>Desayuno:</strong> ${data.desayuno.alimento} (${data.desayuno.calorias} calorías)`;
        document.getElementById(`colacion-${dia}`).innerHTML = `<strong>A media mañana:</strong> ${data.colacion.alimento} (${data.colacion.calorias} calorías)`;
        document.getElementById(`almuerzo-${dia}`).innerHTML = `<strong>Almuerzo:</strong> ${data.almuerzo.alimento} (${data.almuerzo.calorias} calorías)`;
        document.getElementById(`merienda-${dia}`).innerHTML = `<strong>Merienda:</strong> ${data.merienda.alimento} (${data.merienda.calorias} calorías)`;
        document.getElementById(`cena-${dia}`).innerHTML = `<strong>Cena:</strong> ${data.cena.alimento} (${data.cena.calorias} calorías)`;
    } else {
        console.log(`Datos no encontrados para ${dia}`);
    }
}

async function cargarPlanAlimenticio() {
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
            limpiarDatosPlan(); // Limpiar los datos del plan alimenticio
            return;
        }

        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        const nombreCompleto = `${userData.Nombre} ${userData.Apellido}`; // Asumiendo que tienes los campos Nombre y Apellido

        // Mostrar el Nombre y Apellido en el <p>
        document.getElementById('Nombredelplan').textContent = nombreCompleto;

        const userId = userDoc.id;
        const planRef = firebase.firestore()
            .collection('users')
            .doc(userId)
            .collection('plan_alimenticio');

        const planSnapshot = await planRef.get();

        // Limpiar los datos del plan alimenticio antes de actualizar
        limpiarDatosPlan();

        if (planSnapshot.empty) {
            console.log('No se encontró un plan alimenticio para este paciente.');
            return;
        } else {
            planSnapshot.forEach(doc => {
                const dia = doc.id;
                actualizarPlanAliment(dia, doc.data());
            });
        }
    } catch (error) {
        console.error('Error al buscar el plan alimenticio:', error);
        alert('Ocurrió un error al buscar el plan alimenticio. Por favor, intente nuevamente.');
    }
}

function limpiarDatosPlan() {
    const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

    dias.forEach(dia => {
        document.getElementById(`desayuno-${dia}`).innerHTML = '';
        document.getElementById(`colacion-${dia}`).innerHTML = '';
        document.getElementById(`almuerzo-${dia}`).innerHTML = '';
        document.getElementById(`merienda-${dia}`).innerHTML = '';
        document.getElementById(`cena-${dia}`).innerHTML = '';
    });
}

async function guardarPlanAlimenticioPersonalizado() {
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
            const desayunoAlimento = document.getElementById(`${dia}-desayuno-alimento`).value;
            const desayunoCalorias = parseInt(document.getElementById(`${dia}-desayuno-calorias`).value);
            const colacionAlimento = document.getElementById(`${dia}-colacion-alimento`).value;
            const colacionCalorias = parseInt(document.getElementById(`${dia}-colacion-calorias`).value);
            const almuerzoAlimento = document.getElementById(`${dia}-almuerzo-alimento`).value;
            const almuerzoCalorias = parseInt(document.getElementById(`${dia}-almuerzo-calorias`).value);
            const meriendaAlimento = document.getElementById(`${dia}-merienda-alimento`).value;
            const meriendaCalorias = parseInt(document.getElementById(`${dia}-merienda-calorias`).value);
            const cenaAlimento = document.getElementById(`${dia}-cena-alimento`).value;
            const cenaCalorias = parseInt(document.getElementById(`${dia}-cena-calorias`).value);

            // Agregar logs para depuración
            console.log(`Datos capturados para ${dia}:`);
            console.log('Desayuno:', desayunoAlimento, desayunoCalorias);
            console.log('Colación:', colacionAlimento, colacionCalorias);
            console.log('Almuerzo:', almuerzoAlimento, almuerzoCalorias);
            console.log('Merienda:', meriendaAlimento, meriendaCalorias);
            console.log('Cena:', cenaAlimento, cenaCalorias);

            // Crear el documento en Firestore
            const diaRef = firebase.firestore()
                .collection('users')
                .doc(userId)
                .collection('plan_alimenticio')
                .doc(dia);

            batch.set(diaRef, {
                desayuno: {
                    alimento: desayunoAlimento || "",  // Agregar un valor por defecto si el campo está vacío
                    calorias: desayunoCalorias || 0   // Agregar un valor por defecto si el campo está vacío
                },
                colacion: {
                    alimento: colacionAlimento || "",
                    calorias: colacionCalorias || 0
                },
                almuerzo: {
                    alimento: almuerzoAlimento || "",
                    calorias: almuerzoCalorias || 0
                },
                merienda: {
                    alimento: meriendaAlimento || "",
                    calorias: meriendaCalorias || 0
                },
                cena: {
                    alimento: cenaAlimento || "",
                    calorias: cenaCalorias || 0
                }
            });
        });

        await batch.commit();
        alert('Plan alimenticio personalizado guardado correctamente.');
    } catch (error) {
        console.error('Error al guardar el plan alimenticio personalizado:', error);
        alert('Ocurrió un error al guardar el plan alimenticio personalizado. Por favor, intente nuevamente.');
    }
}

document.getElementById('buscar-plan').addEventListener('click', function () {
    cargarPlanAlimenticio();
});
