document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('message-input');

    // Event listener para el campo de entrada
    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita el comportamiento predeterminado del Enter (como saltar líneas)
            sendMessage(); // Llama a la función sendMessage
        }
    });
});

async function sendMessage() {
    const messageContent = document.getElementById('message-input').value.trim();
    const messagesDiv = document.getElementById('message-area');

    if (!messageContent) return;

    // Crear y agregar el mensaje del usuario al chat
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'sent');
    userMessageDiv.innerHTML = `<div class="message-sent">${messageContent}</div>`;
    messagesDiv.appendChild(userMessageDiv);
    document.getElementById('message-input').value = '';

    // Crear la burbuja para la respuesta del asistente con el spinner
    const assistantMessageDiv = document.createElement('div');
    assistantMessageDiv.classList.add('message', 'received');
    assistantMessageDiv.innerHTML = `
        <div class="message-wrapper">
            <img src="img/logo.png" alt="Logo" class="logochat" />
            <div class="message-received">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="message-content d-none"></div>
            </div>
        </div>
    `;
    messagesDiv.appendChild(assistantMessageDiv);
    const assistantMessageContent = assistantMessageDiv.querySelector('.message-content');
    const spinner = assistantMessageDiv.querySelector('.spinner-border');

    // Desplazar al fondo del chat
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    try {
        // Enviar el mensaje a la API
        const response = await fetch('https://8000-jocuz-llmollamaprueb-zdi6fhspgci.ws-us115.gitpod.io/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: [
                    { role: 'user', content: messageContent }
                ]
            }),
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const data = await response.json();

        // Formatear la respuesta del asistente
        const formattedResponse = data.content
            .replace(/\n/g, '&lt;br&gt;')  // Reemplaza saltos de línea con <br> para HTML
            .replace(/(?:\r\n|\r|\n)/g, '&lt;br&gt;'); // Asegura que otros tipos de saltos de línea también sean manejados

        // Ocultar el spinner y mostrar el texto
        spinner.classList.add('d-none');
        assistantMessageContent.classList.remove('d-none');

        // Mostrar la respuesta con efecto de escritura
        await typeEffect(assistantMessageContent, formattedResponse);

    } catch (error) {
        // Mostrar mensaje de error en el chat
        spinner.classList.add('d-none');
        assistantMessageContent.classList.remove('d-none');
        assistantMessageContent.innerHTML = 'Error: No se pudo enviar el mensaje.';
        console.error('Error:', error);
    } finally {
        // Desplazar al fondo del chat
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
}

async function typeEffect(element, text) {
    const delay = 50; // milisegundos por carácter
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text.charAt(i);
        await new Promise(resolve => setTimeout(resolve, delay));
        // Desplazar al fondo del chat a medida que se escribe
        element.parentElement.parentElement.scrollTop = element.parentElement.parentElement.scrollHeight;
    }
}
