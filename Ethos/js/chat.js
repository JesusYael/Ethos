const conversations = {
    1: [
        { type: 'sent', message: 'Hola, ¿cómo estás?' },
        { type: 'received', message: '¡Hola! Estoy bien, ¿y tú?' }
    ],
    2: [
        { type: 'sent', message: '¿Como sigues?' },
        { type: 'received', message: 'Muy bien' }
    ],
    3: [
        { type: 'sent', message: 'Hola, necesitas ayuda' },
        { type: 'received', message: 'No muchas gracias' }
    ]
};

function changeConversation(conversationId) {
    const messageArea = document.getElementById('message-area');
    messageArea.innerHTML = '';

    const messages = conversations[conversationId];
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', msg.type);
        messageDiv.innerHTML = `<div class="message-${msg.type}">${msg.message}</div>`;
        messageArea.appendChild(messageDiv);
    });
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    if (message !== '') {
        const messageArea = document.getElementById('message-area');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'sent');
        messageDiv.innerHTML = `<div class="message-sent">${message}</div>`;
        messageArea.appendChild(messageDiv);
        input.value = '';
    }
}
