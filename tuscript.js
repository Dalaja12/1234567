// Abre el modal de chat
document.getElementById('chat-btn').onclick = function() {
    document.getElementById('chat-modal').classList.add('show');
};

// Cierra el modal de chat
function closeChatModal() {
    document.getElementById('chat-modal').classList.remove('show');
}

// Agrega esto al final de tu script JavaScript
window.onload = function() {
    // Muestra la notificación después de que la página se haya cargado completamente
    document.getElementById('notification').style.display = 'block';
    
    // Oculta la notificación después de unos segundos
    setTimeout(function() {
        document.getElementById('notification').style.display = 'none';
    }, 5000); // Cambia el valor de 5000 a la cantidad de milisegundos que deseas que la notificación permanezca visible
}


// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBd8VEqwpRCytHpmPTOGAn7vfJVpZknpbg",
    authDomain: "inscripciones-bbaf3.firebaseapp.com",
    projectId: "inscripciones-bbaf3",
    storageBucket: "inscripciones-bbaf3.appspot.com",
    messagingSenderId: "679964288319",
    appId: "1:679964288319:web:e33df3d48d5cce0ee1df8a",
    measurementId: "G-24SRJMJYKZ"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la colección de mensajes en Firestore
var chatRef = firebase.firestore().collection('chat');

// Enviar un mensaje
function sendMessage() {
    var message = document.getElementById('chat-input').value;
    if (message.trim() !== "") {
        chatRef.add({
            "message": message,
            "timestamp": firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('chat-input').value = '';
    }
}

// Mostrar mensajes en tiempo real
chatRef.orderBy('timestamp').onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
        if (change.type === 'added') {
            var message = change.doc.data().message;
            var messageElement = document.createElement('div');
            messageElement.textContent = message;
            document.getElementById('chat-messages').appendChild(messageElement);
        }
    });
});

