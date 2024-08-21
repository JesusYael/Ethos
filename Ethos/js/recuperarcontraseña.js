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
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function handlePasswordReset(event) {
    event.preventDefault(); // Evita el envío predeterminado del formulario

    const emailInput = document.getElementById('email');
    const messageDiv = document.getElementById('message');
    const emailAddress = emailInput.value;

    firebase.auth().sendPasswordResetEmail(emailAddress)
        .then(() => {
            alert('Se ha enviado un correo electrónico de recuperación de contraseña.'); 
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            messageDiv.textContent = `Error: ${errorMessage} (${errorCode})`;
            messageDiv.style.color = 'red';
            console.error('Error al enviar el correo electrónico de recuperación de contraseña:', error);
        });
}

// Asegúrate de que el DOM esté completamente cargado antes de agregar el event listener
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('passwordResetForm');
    form.addEventListener('submit', handlePasswordReset);
});