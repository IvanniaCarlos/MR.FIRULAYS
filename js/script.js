import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    // --- REFERENCIAS ---
    const loginModal = document.getElementById("loginModal");
    const regModal = document.getElementById("registerModal");
    const toLoginLink = document.getElementById("toLogin");
    const forgotPasswordLink = document.querySelector(".forgot-password"); 
    const provider = new GoogleAuthProvider();

    // --- FUNCIÓN PARA VER/OCULTAR CONTRASEÑA ---
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

    // --- CONTROL DE MODALES ---
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

    // --- RECUPERAR CONTRASEÑA ---
    if (forgotPasswordLink) {
        forgotPasswordLink.onclick = async (e) => {
            e.preventDefault();
            const emailInput = loginModal.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!email) {
                alert("Por favor, ingresa tu correo electrónico.");
                emailInput.focus();
                return;
            }

            try {
                await sendPasswordResetEmail(window.auth, email);
                alert("¡Correo enviado! Revisa tu bandeja de entrada.");
            } catch (error) {
                console.error("Error:", error);
                alert("Error al enviar el correo.");
            }
        };
    }

    // --- LOGIN CON GOOGLE (CONEXIÓN PHP/MYSQL) ---
    const btnGoogle = document.getElementById("btnGoogle");
    if (btnGoogle) {
        btnGoogle.onclick = async () => {
            try {
                // 1. Firebase valida la cuenta de Google
                const result = await signInWithPopup(window.auth, provider);
                const user = result.user;

                // 2. Preparamos los datos para PHP
                const formData = new FormData();
                formData.append('nombre', user.displayName);
                formData.append('email', user.email);
                formData.append('foto', user.photoURL);

                // 3. Enviamos a login_google.php para guardar en MySQL
                await fetch('login_google.php', {
                    method: 'POST',
                    body: formData
                });

                // 4. Redirigimos al panel PHP
                window.location.href = "principal.php"; 

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
                window.location.href = "principal.php"; 
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
                window.location.href = "principal.php";
            } catch (error) {
                alert("Correo o contraseña incorrectos.");
            }
        };
    }
});