import { auth } from './firebase-config.js'; 
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const userNameDisplay = document.getElementById('userNameDisplay');
const welcomeMessage = document.getElementById('welcomeMessage');
const userPhotoContainer = document.getElementById('userPhotoContainer');

onAuthStateChanged(auth, (user) => {
    if (user) {
        // 1. Mostrar nombre (de Google o el que registramos)
        const name = user.displayName || "Usuario";
        userNameDisplay.textContent = name;
        welcomeMessage.textContent = `Bienvenido al panel de citas, ${name}`;

        // 2. Gestionar la foto
        if (user.photoURL) {
            // Si entró con Google
            userPhotoContainer.innerHTML = `<img src="${user.photoURL}" alt="Perfil" style="width:100%; border-radius:50%;">`;
        } else {
            // Si entró con correo (Icono blanco sobre fondo azul como la imagen)
            userPhotoContainer.innerHTML = `<i class="fas fa-user"></i>`;
            userPhotoContainer.style.backgroundColor = "#1a4670"; 
            userPhotoContainer.style.color = "white";
        }
    } else {
        // Si no hay usuario, devolver al login
        window.location.href = "index.html";
    }
});