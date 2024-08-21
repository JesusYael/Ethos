// Inicializa Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDYOnv_kYwnTv_r0OHSNrHEvlCdi2WZX94",
    authDomain: "ethosapp-4353b.firebaseapp.com",
    projectId: "ethosapp-4353b",
    storageBucket: "ethosapp-4353b.appspot.com",
    messagingSenderId: "280180054610",
    appId: "1:280180054610:web:0499a47a5fcbee64e85d8b",
    measurementId: "G-1PYWCTPJ2K"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(); // Inicializa Firestore

// Función para obtener la fecha actual en formato yyyy-mm-dd
function displayCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes en formato de dos dígitos
    const day = String(today.getDate()).padStart(2, '0'); // Día en formato de dos dígitos
    const formattedDate = `${year}-${month}-${day}`;
    document.getElementById('diadehoy').textContent = formattedDate;
}


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

// Función para obtener el numeroNutriologo y guardarlo en localStorage
async function inicializarNumeroNutriologo() {
    try {
        const user = firebase.auth().currentUser;
        if (user) {
            const userDoc = await getDocs(query(collection(db, 'Nutriologos'), where('email', '==', user.email)));
            if (!userDoc.empty) {
                const doc = userDoc.docs[0];
                const numeroNutriologo = doc.data().numeroNutriologo;
                localStorage.setItem('numeroNutriologo', numeroNutriologo);
                await loadScheduledHours(numeroNutriologo); // Carga las horas agendadas
            } else {
                console.log('No se encontró el numeroNutriologo para el usuario.');
            }
        } else {
            console.log('No hay un usuario autenticado.');
        }
    } catch (error) {
        console.error('Error al obtener el numeroNutriologo:', error);
    }
}

// Llama a la función cuando se carga la página
document.addEventListener('DOMContentLoaded', async () => {
    displayCurrentDate();
    await inicializarNumeroNutriologo();
    await resaltarHorasCoincidentes(); // Asegurarse de que la función resalte las horas coincidentes
});

document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const Noexpafil = document.getElementById('Noexpafil').value.trim();

    if (Noexpafil) {
        try {
            // Referencia a la colección 'users'
            const usersCollection = db.collection('users');
            
            // Crea una consulta para buscar el documento por Noexpafil
            const querySnapshot = await usersCollection.where('Noexpafil', '==', Noexpafil).get();

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const Nombre = doc.data().Nombre;
                    const Apellido = doc.data().Apellido;
                    const numeroNutriologo = doc.data().numeroNutriologo;

                    localStorage.setItem('Noexpafil', Noexpafil);
                    localStorage.setItem('Nombre', Nombre);
                    localStorage.setItem('Apellido', Apellido);
                    localStorage.setItem('numeroNutriologo', numeroNutriologo);

                    document.getElementById('nombrepaciente').textContent = `${Nombre} ${Apellido}`;
                });
            } else {
                document.getElementById('nombrepaciente').textContent = 'No se encontraron resultados.';
            }
        } catch (error) {
            console.error('Error al buscar el documento:', error);
        }
    } else {
        document.getElementById('nombrepaciente').textContent = 'Por favor ingrese un valor en el campo Noexpafil.';
    }
});

// Función para ajustar la fecha y formatearla en yyyy-mm-dd
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    const d = new Date(year, month - 1, day);
    let formattedDay = String(d.getDate()).padStart(2, '0');
    let formattedMonth = String(d.getMonth() + 1).padStart(2, '0');
    let formattedYear = d.getFullYear();
    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}

async function resaltarHorasCoincidentes() {
    try {
        const numeroNutriologo = localStorage.getItem('numeroNutriologo');
        const today = new Date().toISOString().split('T')[0]; // Fecha actual en formato yyyy-mm-dd

        // Consulta las citas de hoy para el numeroNutriologo actual
        const citasSnapshot = await db.collection('Citaspacientes')
            .where('numeroNutriologo', '==', numeroNutriologo)
            .where('cita', '==', today)
            .get();

        if (!citasSnapshot.empty) {
            const hours = citasSnapshot.docs.map(doc => doc.data().hora);

            document.querySelectorAll('.available-time').forEach(item => {
                const itemTime = item.dataset.time;
                if (hours.includes(itemTime)) {
                    item.classList.add('highlighted'); // Añadir clase para resaltar en azul
                }
            });
        } else {
            console.log('No hay citas para el día de hoy.');
        }
    } catch (error) {
        console.error('Error al obtener las citas:', error);
    }
}

// Función para cargar las horas agendadas y marcar las disponibles en azul
async function loadScheduledHours(numeroNutriologo) {
    try {
        const today = new Date().toISOString().split('T')[0]; // Fecha actual en formato yyyy-mm-dd
        const citasSnapshot = await db.collection('Citaspacientes')
            .where('numeroNutriologo', '==', numeroNutriologo)
            .where('cita', '==', today)
            .get();

        if (!citasSnapshot.empty) {
            const hours = citasSnapshot.docs.map(doc => doc.data().hora);
            document.querySelectorAll('.available-time').forEach(item => {
                const itemTime = item.dataset.time;
                if (hours.includes(itemTime)) {
                    item.style.color = 'blue'; // Marca la hora en azul
                }
            });
        }
    } catch (error) {
        console.error('Error al cargar las horas agendadas:', error);
    }
}

// Añadir evento a las horas disponibles
document.querySelectorAll('.available-time').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.available-time').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
    });
});

// Función para agendar la cita
async function agendarCita(Noexpafil, Nombre, numeroNutriologo) {
    const newDate = document.getElementById('new-date').value;
    const selectedTime = document.querySelector('.available-time.active').dataset.time;

    if (!newDate || !selectedTime) {
        alert('Por favor, seleccione una nueva fecha y hora.');
        return;
    }

    const formattedDate = formatDate(newDate);

    try {
        const citaSnapshot = await db.collection('Citaspacientes')
        .where('cita', '==', formattedDate)
        .where('hora', '==', selectedTime)
        .get();
    
    let isConflict = false;
    
    if (!citaSnapshot.empty) {
        citaSnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.numeroNutriologo === numeroNutriologo) {
                isConflict = true;
            }
        });
    }
    
    if (isConflict) {
        alert('Ya hay una cita agendada para la fecha y hora seleccionada con este nutriólogo. Por favor, seleccione otra fecha y hora.');
        return;
    }
    

        const snapshot = await db.collection('Citaspacientes').where('Noexpafil', '==', Noexpafil).get();

        if (!snapshot.empty) {
            const citaDoc = snapshot.docs[0].ref;
            await citaDoc.update({
                Nombre: Nombre,
                cita: formattedDate,
                hora: selectedTime,
                numeroNutriologo: numeroNutriologo
            });
            alert('Cita actualizada exitosamente');
            location.reload();
        } else {
            await db.collection('Citaspacientes').add({
                Noexpafil,
                Nombre: Nombre,
                cita: formattedDate,
                hora: selectedTime,
                numeroNutriologo: numeroNutriologo
            });
            alert('Cita agendada exitosamente');
            location.reload();
        }

        const userSnapshot = await db.collection('users').where('Noexpafil', '==', Noexpafil).get();
        if (!userSnapshot.empty) {
            const userDoc = userSnapshot.docs[0].ref;
            await userDoc.update({ cita: formattedDate, hora: selectedTime });
        } else {
            console.error('No se encontró el usuario correspondiente para actualizar la cita');
        }
    } catch (error) {
        console.error('Error al agendar la cita:', error);
        alert('Hubo un error al agendar la cita. Por favor, inténtelo de nuevo.');
    }
}

// Evento para agendar la cita cuando se hace clic en el botón
document.getElementById('save-changes').addEventListener('click', () => {
    const Noexpafil = localStorage.getItem('Noexpafil');
    const Nombre = localStorage.getItem('Nombre');
    const numeroNutriologo = localStorage.getItem('numeroNutriologo');

    if (Noexpafil && Nombre && numeroNutriologo) {
        agendarCita(Noexpafil, Nombre, numeroNutriologo);
    } else {
        console.log('No se encontraron datos en localStorage.');
    }
});

//#############################################################################################################################################################
//#############################################################################################################################################################
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
  
  // También puedes utilizar esto para verificar la autenticación en el historial del navegador
window.addEventListener('popstate', function(event) {
    auth.onAuthStateChanged((user) => {
        if (!user) {
            // Redirigir a la página de inicio de sesión si no está autenticado
            window.location.href = 'inicio_de_sesion.html';
        }
    });
  });
//#############################################################################################################################################################
//#############################################################################################################################################################