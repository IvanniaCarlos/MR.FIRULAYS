import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const userAvatar = document.getElementById("userAvatar");
    const userNameTop = document.getElementById("userNameTop");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const btnLogout = document.getElementById("btnLogout");
    const whatsappLink = document.getElementById("whatsappLink");

    const tuNumeroCelular = "51934501329"; 
    const mensajeTexto = encodeURIComponent("¡Hola, MR. Firulays! Necesito hacer una consulta sobre mi cita.");
    if (whatsappLink) {
        whatsappLink.href = `https://wa.me/${tuNumeroCelular}?text=${mensajeTexto}`;
    }

    if (window.auth) {
        onAuthStateChanged(window.auth, (user) => {
            if (user) {
                const displayName = user.displayName || user.email.split('@')[0];
                
                userNameTop.textContent = displayName;
                welcomeMessage.textContent = `Bienvenido al panel de citas, ${displayName}`;

                if (user.photoURL) {
                    userAvatar.innerHTML = `<img src="${user.photoURL}" alt="Foto de ${displayName}">`;
                } else {
                    userAvatar.innerHTML = `<i class="fas fa-user"></i>`;
                }
            } else {
                window.location.href = "index.htm";
            }
        });
    }

    if (btnLogout) {
        btnLogout.onclick = async () => {
            if (window.auth) {
                try {
                    await signOut(window.auth);
                    window.location.href = "index.htm";
                } catch (error) {
                    console.error("Error al cerrar sesión:", error);
                    window.location.href = "index.htm";
                }
            }
        };
    }
});