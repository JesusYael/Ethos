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

// Obtiene referencias a los elementos del formulario
const formularioSesion = document.getElementById('formulario-sesion');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const googleLoginButton = document.getElementById('google-login');

// Espera a que el DOM cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    // Maneja el envío del formulario
    formularioSesion.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío predeterminado

        // Obtiene los datos del formulario
        const email = emailInput.value;
        const password = passwordInput.value;

        // Inicia sesión con Firebase Authentication
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Usuario autenticado correctamente
                const user = userCredential.user;
                console.log("Usuario autenticado:", user);

                // Redirige a inicio.html
                window.location.href = "inicio.html";
            })
            .catch((error) => {
                // Maneja el error de inicio de sesión
                const errorCode = error.code;
                const errorMsg = error.message;
                console.error("Error de inicio de sesión:", errorCode, errorMsg);

                // Muestra el mensaje de error al usuario
                errorMessage.textContent = "Error de inicio de sesión: " + errorMsg;
                errorMessage.style.display = "block";
            });
    });

    // Maneja el botón de inicio de sesión con Google
    googleLoginButton.addEventListener('click', () => {
        // Configura el proveedor de Google
        const provider = new firebase.auth.GoogleAuthProvider();

        // Inicia sesión con Google
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                // Usuario autenticado correctamente
                const user = result.user;
                console.log("Usuario autenticado con Google:", user);

                // Redirige a inicio.html
                window.location.href = "inicio.html";
            })
            .catch((error) => {
                // Maneja el error de inicio de sesión con Google
                const errorCode = error.code;
                const errorMsg = error.message;
                console.error("Error de inicio de sesión con Google:", errorCode, errorMsg);

                // Muestra el mensaje de error al usuario
                errorMessage.textContent = "Error de inicio de sesión con Google: " + errorMsg;
                errorMessage.style.display = "block";
            });
    });
});
