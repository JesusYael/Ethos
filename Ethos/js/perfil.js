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

// Función para cargar datos al cargar la página
window.onload = async function () {
    try {
        let userEmail = localStorage.getItem('userEmail');

        if (!userEmail) {
            userEmail = await getUserEmail();
        }

        if (!userEmail) {
            console.log('Unable to get user email');
            return;
        }

        console.log('Using user email:', userEmail);

        // Inicializa Firestore
        const db = firebase.firestore();

        // Buscar el documento en Firestore usando el email
        const querySnapshot = await db.collection('Nutriologos').where('email', '==', userEmail).get();

        if (querySnapshot.empty) {
            console.log("No matching documents.");
            return;
        }

        // Asumimos que solo hay un documento con ese email
        const doc = querySnapshot.docs[0];
        const docId = doc.id;
        const data = doc.data();
        console.log('Document data:', data);

        // Asigna los datos a los campos del formulario
        document.getElementById('nombre').textContent = data.nombre + ' ' + data.apellidos;
        document.getElementById('email').textContent = data.email;
        document.getElementById('cedula').textContent = data.cedula;

        // Verifica y muestra la URL de la foto de perfil
        if (data.fotoPerfilURL) {
            console.log('Foto Perfil URL:', data.fotoPerfilURL);
            document.getElementById('foto-perfil').src = data.fotoPerfilURL;
        } else {
            console.log("No fotoPerfilURL field in document.");
        }

        if (data.cedulaURL) {
            console.log('Foto cedula URL:', data.cedulaURL);
            document.getElementById('cedulafoto').src = data.cedulaURL;
        } else {
            console.log("No cedulaURL field in document.");
        }

    } catch (error) {
        console.error("Error getting document:", error);
    }
};

// Función para cargar datos de la colección "Datos"
async function cargarDatos() {
    try {
        let userEmail = localStorage.getItem('userEmail');

        if (!userEmail) {
            userEmail = await getUserEmail();
        }

        if (!userEmail) {
            console.log('Unable to get user email');
            return;
        }

        console.log('Using user email:', userEmail);

        // Inicializa Firestore
        const db = firebase.firestore();

        // Buscar el documento en Firestore usando el email en la colección "Datos"
        const querySnapshot = await db.collection('Datos').where('email', '==', userEmail).get();

        console.log('Query snapshot:', querySnapshot);

        if (querySnapshot.empty) {
            console.log("No matching documents in Datos.");
            return;
        }

        // Asumimos que solo hay un documento con ese email
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        console.log('Document data:', data);
        // Asigna los datos a los campos del formulario
        document.getElementById('telefono').textContent = data.telefono || '';
        document.getElementById('edad').textContent = data.edad || '';
        document.getElementById('sexo').textContent = data.sexo || '';
        document.getElementById('especializacion').textContent = data.especializacion || '';
        document.getElementById('experiencia').textContent = data.experiencia || '';
        document.getElementById('centrotrabajo').textContent = data.centroTrabajo || '';
        document.getElementById('horario1').textContent = data.horario1 || '';
        document.getElementById('horari2s').textContent = data.horario2 || '';
        document.getElementById('modalidades').textContent = data.modalidades || '';
        document.getElementById('descripcion').textContent = data.descripcion || '';
        document.getElementById('historial').textContent = data.historial || '';

    } catch (error) {
        console.error("Error getting document from Datos:", error);
    }
}

// Llama a la función cargarDatos después de que la página haya cargado
window.addEventListener('load', cargarDatos);


// Función para guardar el formulario en Firestore
async function guardarFormulario() {
    try {
        // Obtiene el correo del usuario desde el localStorage
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            console.log('No se encontró el correo del usuario.');
            return;
        }

        // Obtiene los valores del formulario
        const form = document.getElementById('datos-form');
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Validación básica (añadir más si es necesario)
        for (const key in data) {
            if (data[key] === '') {
                console.log('Por favor, rellena todos los campos.');
                return;
            }
        }

        // Guarda los datos en Firestore
        const db = firebase.firestore();
        await db.collection('Datos').add({
            email: userEmail,
            ...data
        });

        // Mensaje de éxito
        console.log('Formulario guardado exitosamente en Firestore.');
        alert("Formulario guardado exitosamente en Firestore.");

        // Cierra el modal después de guardar el formulario
        const modal = bootstrap.Modal.getInstance(document.getElementById('modaldatos'));
        modal.hide();

    } catch (error) {
        console.error('Error al guardar formulario:', error);
    }
}
// Asignar evento de click al botón de guardar información
document.getElementById('saveButton').addEventListener('click', guardarFormulario);

// Función para cargar datos de la colección "Datos"
async function cargarDatos() {
    try {
        let userEmail = localStorage.getItem('userEmail');

        if (!userEmail) {
            userEmail = await getUserEmail();
        }

        if (!userEmail) {
            console.log('Unable to get user email');
            return;
        }

        console.log('Using user email:', userEmail);

        // Inicializa Firestore
        const db = firebase.firestore();

        // Buscar el documento en Firestore usando el email en la colección "Datos"
        const querySnapshot = await db.collection('Datos').where('email', '==', userEmail).get();

        console.log('Query snapshot:', querySnapshot);

        if (querySnapshot.empty) {
            console.log("No matching documents in Datos.");
            return;
        }

        // Asumimos que solo hay un documento con ese email
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        console.log('Document data:', data);
        // Asigna los datos a los campos del formulario
        document.getElementById('perfil-telefono').textContent = data.telefono || '';
        document.getElementById('perfil-edad').textContent = data.edad || '';
        document.getElementById('perfil-sexo').textContent = data.sexo || '';
        document.getElementById('perfil-especializacion').textContent = data.especializacion || '';
        document.getElementById('perfil-experiencia').textContent = data.experiencia || '';
        // Asigna los datos a los campos del formulario
        document.getElementById('perfil-centro-trabajo').textContent = data['centro-trabajo'] || '';
        document.getElementById('perfil-horarios').textContent = (data.horario1 || '') + ' a ' + (data.horario2 || '') + ' hrs.' ;
        document.getElementById('perfil-modalidades').textContent = data.modalidades || '';
        document.getElementById('perfil-descripcion').textContent = data.descripcion || '';
        document.getElementById('perfil-nodenutriologo').textContent = data.numeroNutriologo || '';

    } catch (error) {
        console.error("Error getting document from Datos:", error);
    }
}

// Llama a la función cargarDatos después de que la página haya cargado
window.addEventListener('load', cargarDatos);

// Función para generar número de nutriólogo
async function generarNumeroNutriologo() {
    try {
        // Obtiene el correo del usuario desde localStorage
        let userEmail = localStorage.getItem('userEmail');

        if (!userEmail) {
            userEmail = await getUserEmail();
        }

        if (!userEmail) {
            console.log('Unable to get user email');
            return;
        }

        console.log('Using user email:', userEmail);

        // Inicializa Firestore
        const db = firebase.firestore();

        // Buscar el documento en Firestore usando el email en la colección "Nutriologos"
        const querySnapshot = await db.collection('Nutriologos').where('email', '==', userEmail).get();

        if (querySnapshot.empty) {
            console.log("No matching documents in Nutriologos.");
            return;
        }

        // Asumimos que solo hay un documento con ese email
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        console.log('Document data:', data);

        // Verifica si ya existe un número de nutriólogo
        if (data.numeroNutriologo) {
            console.log('Número de nutriólogo ya existe:', data.numeroNutriologo);
            return;
        }

        // Genera el número de nutriólogo
        const apellidos = data.apellidos.substring(0, 2).toUpperCase();
        const nombre = data.nombre.substring(0, 2).toUpperCase();
        const cedula = data.cedula.substring(0, 2);
        const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Genera un número aleatorio de 4 dígitos
        const numeroNutriologo = `${apellidos}${nombre}${cedula}${randomNumbers}`;

        console.log('Número de nutriólogo generado:', numeroNutriologo);

        // Guarda el número generado en la colección "Datos"
        const datosQuerySnapshot = await db.collection('Datos').where('email', '==', userEmail).get();
        if (!datosQuerySnapshot.empty) {
            const datosDoc = datosQuerySnapshot.docs[0];
            await db.collection('Datos').doc(datosDoc.id).update({
                numeroNutriologo: numeroNutriologo
            });
            console.log('Número de nutriólogo guardado exitosamente en Firestore.');
        } else {
            console.log('No matching documents in Datos.');
        }

        // Actualiza el documento en la colección "Nutriologos" con el número generado
        await db.collection('Nutriologos').doc(doc.id).update({
            numeroNutriologo: numeroNutriologo
        });
        console.log('Número de nutriólogo guardado exitosamente en Nutriologos.');

        // Asigna el número de nutriólogo como nombre del nuevo documento en la colección "vinculacionpacientes"
        await db.collection('vinculacionpacientes').doc(numeroNutriologo).set({});
        console.log('Documento creado exitosamente en vinculacionpacientes.');

    } catch (error) {
        console.error("Error generating and saving numero de nutriologo:", error);
    }
}
// Asignar evento de click al botón de generar número de nutriólogo
document.getElementById('saveButton').addEventListener('click', generarNumeroNutriologo);


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