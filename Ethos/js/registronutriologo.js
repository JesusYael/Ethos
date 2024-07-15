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
function validarFormulario() {
    var nombre = document.getElementById('nombre').value;
    var apellidos = document.getElementById('apellidos').value;
    var correo = document.getElementById('correo').value;
    var contrasena = document.getElementById('contrasena').value;
    var cedula = document.getElementById('cedula').value;
    var cedulaFile = document.getElementById('formFileSm').value;
    var fotoPerfil = document.getElementById('fotoPerfil').value;

    if (nombre.trim() === '' || apellidos.trim() === '' || correo.trim() === '' || contrasena.trim() === '' || cedula.trim() === '' || cedulaFile.trim() === '' || fotoPerfil.trim() === '') {
        alert('Por favor completa todos los campos.');
        return false;
    }

    // Crea un nuevo usuario en Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(correo, contrasena)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuario creado:", user);

        })
        .catch((error) => {

            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error de creación de usuario:", errorCode, errorMessage);

            // Muestra el mensaje de error al usuario
            document.getElementById('error-message').textContent = "Error al registrarse: " + errorMessage;
            document.getElementById('error-message').style.display = "block";
        });
}