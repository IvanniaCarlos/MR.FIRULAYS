<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MR. Firulays - Panel de Citas</title>
    <link rel="stylesheet" href="css/panel.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="panel-body">

    <header class="panel-header">
        <nav class="navbar-panel">
            <div class="logo">
                <i class="fas fa-paw logo-icon"></i>
                <div class="logo-text">
                    <span>MR.Firulays</span>
                    <small class="sub-logo">Clínica Veterinaria</small>
                </div>
            </div>

            <ul class="panel-tabs">
                <li class="tab-item active"><a href="#"><i class="fas fa-calendar-alt"></i> MIS CITAS</a></li>
                <li class="tab-item"><a href="#"><i class="fas fa-dog"></i> MIS MASCOTAS</a></li>
                <li class="tab-item"><a href="#"><i class="fas fa-credit-card"></i> PAGOS</a></li>
                <li class="tab-item"><a href="#"><i class="fas fa-comment-dots"></i> RECLAMOS/QUEJA</a></li>
            </ul>

            <div class="user-profile-menu">
                <div class="avatar-circle" id="userAvatar">
                    <i class="fas fa-user"></i>
                </div>
                <span class="user-name-text" id="userNameTop">Cargando...</span>
                <button id="btnLogout" class="btn-small-logout" title="Cerrar Sesión">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            </div>
        </nav>
    </header>

    <main class="panel-content-wrapper">
        <section class="welcome-container">
            <div class="welcome-banner">
                <i class="fas fa-calendar-check banner-icon"></i>
                <h2 id="welcomeMessage">Bienvenido al panel de citas</h2>
            </div>
            <button class="btn-add-appointment" onclick="window.location.href='agendar.php'">
            <i class="fas fa-plus"></i> Agendar nueva cita
            </button>
        </section>

        <section class="appointments-section">
            <h3 class="section-title">Próximas citas</h3>
            <div class="appointments-grid">
                <div class="appointment-card">
                    <div class="card-top-info">
                        <span>15/05/2026</span>
                        <span>10:00 AM</span>
                    </div>
                    <div class="card-main-content">
                        <div class="pet-photo-placeholder">
                            <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200" alt="Mascota">
                        </div>
                        <div class="pet-details">
                            <h4>LUNA</h4>
                            <p class="med-reason">Chequeo General</p>
                            <p class="doc-assigned">Veterinaria: Dra. Carmen Soto</p>
                            <span class="status-badge">Estado: Confirmada</span>
                        </div>
                    </div>
                    <div class="card-actions">
                        <button class="btn-view-details">Ver detalles</button>
                        <button class="btn-reprogram">Reprogramar</button>
                    </div>
                </div>
                </div>
        </section>
    </main>

    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
        import { getAuth } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

        const firebaseConfig = {
            apiKey: "AIzaSyDCm LdcegKDBdJPw_OV4aQIQ3TBhli7nzQ",
            authDomain: "veterinaria-mr-firulays.firebaseapp.com",
            projectId: "veterinaria-mr-firulays",
            storageBucket: "veterinaria-mr-firulays.firebasestorage.app",
            messagingSenderId: "913958724869",
            appId: "1:913958724869:web:9349306cfa0d444e55436c"
        };

        // Inicializamos Firebase y lo exponemos globalmente para panel.js
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        window.auth = auth;
    </script>

    <script type="module" src="js/panel.js"></script>
</body>
</html>