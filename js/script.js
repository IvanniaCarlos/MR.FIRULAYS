import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    // REFERENCIAS
    const loginModal = document.getElementById("loginModal");
    const regModal = document.getElementById("registerModal");
    const toLoginLink = document.getElementById("toLogin");
    const forgotPasswordLink = document.querySelector(".forgot-password"); 
    const provider = new GoogleAuthProvider();

    const setupEye = (iconId, inputId) => {
        const icon = document.getElementById(iconId);
        const input = document.getElementById(inputId);
        if (icon && input) {
            icon.onclick = () => {
                const isPassword = input.type === "password";
                input.type = isPassword ? "text" : "password";
                icon.classList.toggle("fa-eye");
                icon.classList.toggle("fa-eye-slash");
            };
        }
    };

    setupEye("togglePassword", "password");
    setupEye("toggleRegPassword", "regPassword");

    document.getElementById("openLogin").onclick = () => { loginModal.style.display = "flex"; };
    document.getElementById("openRegisterHero2").onclick = () => { regModal.style.display = "flex"; };

    if (toLoginLink) {
        toLoginLink.onclick = (e) => {
            e.preventDefault(); 
            regModal.style.display = "none";    
            loginModal.style.display = "flex";  
        };
    }

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = () => {
            loginModal.style.display = "none";
            regModal.style.display = "none";
        };
    });

    if (forgotPasswordLink) {
        forgotPasswordLink.onclick = async (e) => {
            e.preventDefault();
            
            // Capturamos el correo que el usuario escribió en el login
            const emailInput = loginModal.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!email) {
                alert("Por favor, ingresa tu correo electrónico en el formulario para enviarte el enlace de recuperación.");
                emailInput.focus();
                return;
            }

            try {
                await sendPasswordResetEmail(window.auth, email);
                alert("¡Correo enviado! Revisa tu bandeja de entrada o spam para restablecer tu contraseña.");
            } catch (error) {
                console.error("Error al enviar correo:", error);
                if (error.code === 'auth/user-not-found') {
                    alert("Este correo no está registrado en MR. Firulays.");
                } else {
                    alert("Hubo un error al intentar enviar el correo: " + error.message);
                }
            }
        };
    }

    const btnGoogle = document.getElementById("btnGoogle");
    if (btnGoogle) {
        btnGoogle.onclick = async () => {
            try {
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