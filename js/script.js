import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    // REFERENCIAS
    const loginModal = document.getElementById("loginModal");
    const regModal = document.getElementById("registerModal");
    const provider = new GoogleAuthProvider();

    // --- FUNCIÓN PARA VER/OCULTAR CONTRASEÑA ---
    const setupEye = (iconId, inputId) => {
        const icon = document.getElementById(iconId);
        const input = document.getElementById(inputId);
        if (icon && input) {
            icon.onclick = () => {
                const isPassword = input.type === "password";
                input.type = isPassword ? "text" : "password";
                // Cambia el icono: si está tachado lo quita y viceversa
                icon.classList.toggle("fa-eye");
                icon.classList.toggle("fa-eye-slash");
            };
        }
    };

    // Activamos los ojos para Login y Registro
    setupEye("togglePassword", "password");
    setupEye("toggleRegPassword", "regPassword");

    // --- ABRIR Y CERRAR MODALES ---
    document.getElementById("openLogin").onclick = () => { loginModal.style.display = "flex"; };
    document.getElementById("openRegisterHero2").onclick = () => { regModal.style.display = "flex"; };

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = () => {
            loginModal.style.display = "none";
            regModal.style.display = "none";
        };
    });

    // --- BOTÓN DE GOOGLE (Para que funcione siempre) ---
    const btnGoogle = document.getElementById("btnGoogle");
    if (btnGoogle) {
        btnGoogle.onclick = async () => {
            try {
                // Usamos window.auth que se inicializó en el index.htm
                await signInWithPopup(window.auth, provider);
                window.location.href = "principal.html";
            } catch (error) {
                console.error("Error Google:", error);
                if (error.code !== 'auth/popup-closed-by-user') {
                    alert("No se pudo conectar con Google.");
                }
            }
        };
    }

    // --- REGISTRO MANUAL ---
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.onsubmit = async (e) => {
            e.preventDefault();
            const email = registerForm.querySelector('input[type="email"]').value;
            const password = document.getElementById("regPassword").value;

            try {
                await createUserWithEmailAndPassword(window.auth, email, password);
                alert("¡Cuenta de MR. Firulays creada con éxito!");
                window.location.href = "principal.html"; 
            } catch (error) {
                alert("Error al registrar: " + error.message);
            }
        };
    }

    // --- LOGIN MANUAL ---
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.onsubmit = async (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = document.getElementById("password").value;

            try {
                await signInWithEmailAndPassword(window.auth, email, password);
                window.location.href = "principal.html";
            } catch (error) {
                alert("Correo o contraseña incorrectos.");
            }
        };
    }
});