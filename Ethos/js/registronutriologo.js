const firebaseConfig = {
    apiKey: "AIzaSyDYOnv_kYwnTv_r0OHSNrHEvlCdi2WZX94",
    authDomain: "ethosapp-4353b.firebaseapp.com",
    projectId: "ethosapp-4353b",
    storageBucket: "ethosapp-4353b.appspot.com",
    messagingSenderId: "280180054610",
    appId: "1:280180054610:web:0499a47a5fcbee64e85d8b",
    measurementId: "G-1PYWCTPJ2K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

function validarFormulario(event) {
    event.preventDefault();

    var nombre = document.getElementById('nombre').value;
    var apellidos = document.getElementById('apellidos').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var cedula = document.getElementById('cedula').value;
    var cedulaFile = document.getElementById('formFileCedula').files[0];
    var fotoPerfil = document.getElementById('formFileFoto').files[0];

    if (nombre.trim() === '' || apellidos.trim() === '' || email.trim() === '' || password.trim() === '' || cedula.trim() === '' || !cedulaFile || !fotoPerfil) {
        alert('Por favor completa todos los campos.');
        return false;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuario creado:", user);

            const cedulaRef = storage.ref().child('Cedulas/' + cedulaFile.name);
            const fotoPerfilRef = storage.ref().child('Fotos_perfil/' + fotoPerfil.name);

            Promise.all([cedulaRef.put(cedulaFile), fotoPerfilRef.put(fotoPerfil)])
                .then(([cedulaSnapshot, fotoPerfilSnapshot]) => {
                    return Promise.all([cedulaSnapshot.ref.getDownloadURL(), fotoPerfilSnapshot.ref.getDownloadURL()]);
                })
                .then(([cedulaURL, fotoPerfilURL]) => {
                    return db.collection('Nutriologos').doc(user.uid).set({
                        nombre: nombre,
                        apellidos: apellidos,
                        email: email,
                        cedula: cedula,
                        cedulaURL: cedulaURL,
                        fotoPerfilURL: fotoPerfilURL
                    });
                })
                .then(() => {
                    alert('Usuario registrado con éxito.');
                })
                .catch((error) => {
                    console.error("Error al subir archivos o guardar en Firestore:", error);
                    document.getElementById('error-message').textContent = "Error al registrarse: " + error.message;
                    document.getElementById('error-message').style.display = "block";
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error de creación de usuario:", errorCode, errorMessage);

            document.getElementById('error-message').textContent = "Error al registrarse: " + errorMessage;
            document.getElementById('error-message').style.display = "block";
        });

    return false;
}

document.getElementById('registroForm').addEventListener('submit', validarFormulario);
