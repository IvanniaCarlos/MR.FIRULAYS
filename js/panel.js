import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const userAvatar = document.getElementById("userAvatar");
    const userNameTop = document.getElementById("userNameTop");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const btnLogout = document.getElementById("btnLogout");

    if (window.auth) {
        onAuthStateChanged(window.auth, (user) => {
            if (user) {
                const displayName = user.displayName || user.email.split('@')[0];
                
                // 1. Mostrar nombre
                if (userNameTop) userNameTop.innerHTML = `${displayName} <i class="fas fa-chevron-down"></i>`;
                if (welcomeMessage) welcomeMessage.textContent = `Bienvenido al panel de citas, ${displayName}`;

                // 2. Lógica de la Foto (Google vs Correo)
                if (userAvatar) {
                    if (user.photoURL) {
                        // Si entró con Google, ponemos su foto
                        userAvatar.innerHTML = `<img src="${user.photoURL}" alt="Foto" style="width:100%; height:100%; object-fit:cover;">`;
                    } else {
                        // Si entró con correo, dejamos el icono de la persona
                        userAvatar.innerHTML = `<i class="fas fa-user"></i>`;
                    }
                }
            } else {
                window.location.href = "index.html";
            }
        });
    }

    if (btnLogout) {
        btnLogout.onclick = async () => {
            try {
                await signOut(window.auth);
                window.location.href = "index.html";
            } catch (error) {
                console.error("Error:", error);
            }
        };
    }
});