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
const firestore = firebase.firestore();

//###################################################################################################################################
//###################################################################################################################################
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
//###################################################################################################################################
//###################################################################################################################################

// Suponiendo que tienes la autenticación configurada y que ya has obtenido el numeroNutriologo
auth.onAuthStateChanged((user) => {
    if (user) {
        // Obteniendo el email del usuario autenticado
        const userEmail = user.email;

        // Obteniendo el numeroNutriologo del usuario autenticado
        const nutriologoRef = firestore.collection('Nutriologos').where('email', '==', userEmail);

        nutriologoRef.get().then(querySnapshot => {
            if (!querySnapshot.empty) {
                const numeroNutriologo = querySnapshot.docs[0].data().numeroNutriologo;

                // Obteniendo los usuarios con el numeroNutriologo correspondiente
                const usersRef = firestore.collection('users').where('numeroNutriologo', '==', numeroNutriologo).limit(6);
                usersRef.get().then(usersSnapshot => {
                    const userElements = ['user1', 'user2', 'user3']; // IDs de los elementos en el HTML
                    let i = 0;

                    usersSnapshot.forEach(doc => {
                        if (i < userElements.length) {
                            const userData = doc.data();
                            const userElement = document.getElementById(userElements[i]);
                            if (userElement) {
                                const spans = userElement.getElementsByTagName('span');
                                spans[0].textContent = userData.Nombre + ' ' + userData.Apellido;
                                spans[1].textContent = userData.Noexpafil;
                            }
                            i++;
                        }
                    });
                }).catch(error => {
                    console.error('Error obteniendo los usuarios:', error);
                });
            }
        }).catch(error => {
            console.error('Error obteniendo el numeroNutriologo:', error);
        });
    } else {
        window.location.href = 'inicio_de_sesion.html';
    }
});

function mostrarCitasPorNutriologo() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            const userEmail = user.email;

            // Buscar el numeroNutriologo basado en el email del usuario autenticado
            const nutriologoRef = firestore.collection('Nutriologos').where('email', '==', userEmail);

            nutriologoRef.get().then(querySnapshot => {
                if (!querySnapshot.empty) {
                    const numeroNutriologo = querySnapshot.docs[0].data().numeroNutriologo;

                    // Buscar las citas que coincidan con el numeroNutriologo
                    const citasRef = firestore.collection('Citaspacientes').where('numeroNutriologo', '==', numeroNutriologo).limit(6);
                    citasRef.get().then(citasSnapshot => {
                        const appointmentElements = ['appointment1', 'appointment2', 'appointment3']; // IDs de los elementos en el HTML
                        let i = 0;

                        citasSnapshot.forEach(doc => {
                            if (i < appointmentElements.length) {
                                const citaData = doc.data();
                                const appointmentElement = document.getElementById(appointmentElements[i]);
                                if (appointmentElement) {
                                    const spans = appointmentElement.getElementsByTagName('span');
                                    if (spans.length >= 2) {
                                        // Asignar Nombre y Hora a los span dentro de cada elemento
                                        spans[0].textContent = citaData.Nombre + ' ' + citaData.Apellido;
                                        spans[1].textContent = citaData.ora;
                                    }
                                }
                                i++;
                            }
                        });
                    }).catch(error => {
                        console.error('Error obteniendo las citas:', error);
                    });
                }
            }).catch(error => {
                console.error('Error obteniendo el numeroNutriologo:', error);
            });
        } 
    });
}
