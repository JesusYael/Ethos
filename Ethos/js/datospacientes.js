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

async function getNumeroNutriologo(userEmail) {
    try {
        const snapshot = await db.collection('Nutriologos').where('email', '==', userEmail).get();
        if (snapshot.empty) {
            console.error('No se encontró el nutriologo para el correo:', userEmail);
            return null;
        }
        const nutriologoDoc = snapshot.docs[0];
        return nutriologoDoc.data().numeroNutriologo;
    } catch (error) {
        console.error('Error al obtener el numeroNutriologo:', error);
        return null;
    }
}

async function displayNumeroNutriologo(userEmail) {
    if (userEmail) {
        const numeroNutriologo = await getNumeroNutriologo(userEmail);
        if (numeroNutriologo) {
            document.getElementById('numeroNutriologo').innerText = numeroNutriologo;
        } else {
            console.error('No se pudo obtener el número de nutriólogo.');
        }
    } else {
        console.error('No se pudo obtener el correo del usuario.');
    }
}

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        const userEmail = await getUserEmail();
        await displayNumeroNutriologo(userEmail);
    } else {
        console.log('Usuario no autenticado');
    }
});

document.getElementById('generarqr').addEventListener('click', async function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const Noexpafil = document.getElementById('Noexpafil').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const tipopaciente = document.getElementById('tipopaciente').innerText;
    const numeroNutriologo = document.getElementById('numeroNutriologo').innerText;

    const qrData = `Noexpafil: ${Noexpafil}, cita: ${fecha}, hora: ${hora}, tipopaciente: ${tipopaciente}, numeroNutriologo: ${numeroNutriologo}`;

    // Limpiar cualquier código QR previo
    document.getElementById('qrcode').innerHTML = "";

    // Generar el código QR
    const qr = qrcode(0, 'M');
    qr.addData(qrData);
    qr.make();
    document.getElementById('qrcode').innerHTML = qr.createImgTag();
});

async function getPacientes(numeroNutriologo, tipoPaciente = '') {
    try {
        let query = db.collection('users').where('numeroNutriologo', '==', numeroNutriologo);
        if (tipoPaciente) {
            query = query.where('tipopaciente', '==', tipoPaciente);
        }
        const snapshot = await query.get();
        if (snapshot.empty) {
            console.error('No se encontraron pacientes para el numeroNutriologo:', numeroNutriologo);
            return [];
        }
        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error('Error al obtener los pacientes:', error);
        return [];
    }
}

let tipoPacienteGlobal = '';

async function loadTable(tipoPaciente = '', page = 1) {
    tipoPacienteGlobal = tipoPaciente; // Actualiza la variable global
    const userEmail = await getUserEmail();
    if (!userEmail) return;

    const numeroNutriologo = await getNumeroNutriologo(userEmail);
    if (!numeroNutriologo) return;

    const pacientes = await getPacientes(numeroNutriologo, tipoPaciente);
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    const itemsPerPage = 6;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPacientes = pacientes.slice(startIndex, endIndex);

    paginatedPacientes.forEach(paciente => {
        const hora = `${paciente.hora}:00`;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${paciente.Nombre + ' ' + paciente.Apellido || ''}</td>
            <td>${paciente.cita  + ' ' + hora}</td>
            <td>${paciente.Noexpafil || ''}</td>
            <td>${paciente.tipopaciente || ''}</td>
            <td><button class="btn btn-success btn-lg view-patient" data-noexpafil="${paciente.Noexpafil || ''}">Ir</button></td>
        `;
        tbody.appendChild(row);
    });

    document.querySelectorAll('.view-patient').forEach(button => {
        button.addEventListener('click', event => {
            const noexpafil = event.currentTarget.getAttribute('data-noexpafil');
            window.location.href = `paciente.html?Noexpafil=${encodeURIComponent(noexpafil)}`;
        });
    });

    createPagination(pacientes.length, page, itemsPerPage);
}

function createPagination(totalItems, currentPage, itemsPerPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationElement = document.querySelector('.pagination');
    paginationElement.innerHTML = '';

    if (currentPage > 1) {
        const prevPageItem = document.createElement('li');
        prevPageItem.classList.add('page-item');
        prevPageItem.innerHTML = `<a class="page-link" href="#" aria-label="Previous" data-page="${currentPage - 1}"><span aria-hidden="true">&laquo;</span></a>`;
        paginationElement.appendChild(prevPageItem);
    }

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        const classes = ['page-item'];
        if (i === currentPage) {
            classes.push('active');
        }
        pageItem.className = classes.join(' ');
        pageItem.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
        paginationElement.appendChild(pageItem);
    }

    if (currentPage < totalPages) {
        const nextPageItem = document.createElement('li');
        nextPageItem.classList.add('page-item');
        nextPageItem.innerHTML = `<a class="page-link" href="#" aria-label="Next" data-page="${currentPage + 1}"><span aria-hidden="true">&raquo;</span></a>`;
        paginationElement.appendChild(nextPageItem);
    }

    paginationElement.querySelectorAll('a').forEach(pageLink => {
        pageLink.addEventListener('click', event => {
            event.preventDefault();
            const newPage = parseInt(event.currentTarget.getAttribute('data-page'));
            loadTable(tipoPacienteGlobal, newPage); // Usa la variable global
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadTable(tipoPacienteGlobal); // Inicializa con el tipo de paciente global
});

document.addEventListener('DOMContentLoaded', () => {
    loadTable();
});

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchInput = document.querySelector('input[type="search"]');
    const tipoPaciente = searchInput.value.trim();
    if (tipoPaciente === 'Nuevo' || tipoPaciente === 'Paciente') {
        tipoPacienteGlobal = tipoPaciente; // Actualiza la variable global
        await loadTable(tipoPaciente);
    } else {
        tipoPacienteGlobal = ''; // Limpia el tipo de paciente global
        await loadTable();
    }
});

document.getElementById("historial").addEventListener("click", async () => {
    try {
        const user = firebase.auth().currentUser;
        if (!user) {
            alert("No se ha iniciado sesión.");
            return;
        }

        // Obtener el email del usuario autenticado
        const userEmail = user.email;

        // Referencia a la colección Nutriologos
        const nutriologosRef = firebase.firestore().collection("Nutriologos");

        // Buscar el documento del nutriologo correspondiente al email del usuario autenticado
        const nutriologoSnapshot = await nutriologosRef.where("email", "==", userEmail).get();

        if (nutriologoSnapshot.empty) {
            alert("No se encontró un nutriólogo con este email.");
            return;
        }

        // Obtener el numeroNutriologo del documento encontrado
        const numeroNutriologo = nutriologoSnapshot.docs[0].data().numeroNutriologo;

        const citasRef = firebase.firestore().collection("Citaspacientes");
        const usersRef = firebase.firestore().collection("users");

        // Buscar las citas que coincidan con el numeroNutriologo
        const citasSnapshot = await citasRef.where("numeroNutriologo", "==", numeroNutriologo).get();

        if (citasSnapshot.empty) {
            alert("No se encontraron citas.");
            return;
        }

        const excelData = [];

        // Iterar sobre las citas y buscar en la colección users
        for (const citaDoc of citasSnapshot.docs) {
            const noexpafil = citaDoc.data().Noexpafil;
            const asistencia = citaDoc.data().Asistencia;
            const usersSnapshot = await usersRef.where("Noexpafil", "==", noexpafil).get();

            if (!usersSnapshot.empty) {
                const userDoc = usersSnapshot.docs[0];
                const userData = userDoc.data();

                // Agregar datos al Excel, incluyendo el campo "Numero" solo si Asistencia es "no"
                excelData.push({
                    Nombre: userData.Nombre,
                    Apellido: userData.Apellido,
                    Noexpafil: noexpafil,
                    Concretada: asistencia,
                    Numero: asistencia === "no" ? userData.Numero : '' // Incluir Numero solo si Asistencia es "no"
                });
            }
        }

        if (excelData.length > 0) {
            generarExcel(excelData);
        } else {
            alert("No se encontraron datos para generar el archivo Excel.");
        }

    } catch (error) {
        console.error("Error al buscar los datos:", error);
    }
});

function generarExcel(data) {
    // Crear un nuevo libro de Excel
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Establecer el color de fondo para las filas con asistencia "no"
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let R = range.s.r + 1; R <= range.e.r; ++R) {
        const cellAsistencia = worksheet['D' + (R + 1)];
        if (cellAsistencia && cellAsistencia.v === 'no') {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cell_address = {c: C, r: R};
                const cell_ref = XLSX.utils.encode_cell(cell_address);
                if (!worksheet[cell_ref]) continue;
                worksheet[cell_ref].s = {
                    fill: {
                        fgColor: { rgb: "FFA500" } // Naranja
                    }
                };
            }
        }
    }

    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, "Historial de Citas");

    // Descargar el archivo Excel
    XLSX.writeFile(workbook, "Historial_de_Citas_2024_08_16.xlsx");
}

//################################################################################################################################################################
//################################################################################################################################################################
auth.onAuthStateChanged(async (user) => {
    if (user) {
        await loadTable();
    } else {
        window.location.href = 'inicio_de_sesion.html';
    }
});

document.getElementById('logoutBtn').addEventListener('click', function (event) {
    event.preventDefault();
    auth.signOut().then(() => {
        localStorage.removeItem('userEmail');
        window.location.href = 'inicio_de_sesion.html';
    }).catch((error) => {
        console.error('Error al cerrar sesión:', error);
    });
});

window.addEventListener('popstate', function (event) {
    auth.onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = 'inicio_de_sesion.html';
        }
    });
});
//################################################################################################################################################################
//################################################################################################################################################################