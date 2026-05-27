<?php
session_start();
// Candado de seguridad
if (!isset($_SESSION['usuario'])) {
    header("Location: index.php");
    exit();
}
$nombreUsuario = $_SESSION['nombre_usuario'];
$correoUsuario = $_SESSION['usuario'];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MR. Firulays - Reclamos y Quejas</title>
    <link rel="stylesheet" href="css/panel.css"> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="panel-body">

    <header class="panel-header">
        <nav class="navbar-panel">
            <div class="logo">
                <i class="fas fa-paw logo-icon"></i>
                <div class="logo-text"><span>MR.Firulays</span><small>Clínica Veterinaria</small></div>
            </div>
            <ul class="panel-tabs">
                <li class="tab-item"><a href="principal.php">MIS CITAS</a></li>
                <li class="tab-item active"><a href="reclamos.php">RECLAMOS/QUEJA</a></li>
            </ul>
            <div class="user-profile-menu">
                <span><?php echo $nombreUsuario; ?></span>
                <button onclick="window.location.href='logout.php'"><i class="fas fa-sign-out-alt"></i></button>
            </div>
        </nav>
    </header>

    <main class="panel-content-wrapper">
        <div class="welcome-banner" style="margin-bottom: 20px; background: white; padding: 20px; border-radius: 15px;">
            <h2 style="color: #004aad;">Bienvenido al panel de reclamos y quejas</h2>
            <p>Tu opinión nos ayuda a mejorar el servicio de nuestros especialistas.</p>
        </div>

        <!-- El enctype="multipart/form-data" es OBLIGATORIO para enviar archivos -->
        <form action="procesar_reclamo.php" method="POST" enctype="multipart/form-data">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                
                <!-- IZQUIERDA: DATOS DE CONTACTO -->
                <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <h3 style="color: #004aad; margin-bottom: 15px;"><i class="fas fa-user-edit"></i> Datos de contacto</h3>
                    
                    <label style="display: block; font-weight: 600; margin-bottom: 5px;">Nombre completo:</label>
                    <input type="text" name="nombre_completo" value="<?php echo $nombreUsuario; ?>" readonly style="width:100%; margin-bottom:15px; padding:10px; border-radius:8px; border:1px solid #ddd; background:#f9f9f9;">

                    <div style="display: flex; gap: 10px;">
                        <div style="flex: 1;">
                            <label style="display: block; font-weight: 600; margin-bottom: 5px;">DNI:</label>
                            <input type="text" name="dni" required style="width:100%; margin-bottom:15px; padding:10px; border-radius:8px; border:1px solid #ddd;">
                        </div>
                        <div style="flex: 1;">
                            <label style="display: block; font-weight: 600; margin-bottom: 5px;">Teléfono:</label>
                            <input type="text" name="telefono" required placeholder="999 999 999" style="width:100%; margin-bottom:15px; padding:10px; border-radius:8px; border:1px solid #ddd;">
                        </div>
                    </div>

                    <label style="display: block; font-weight: 600; margin-bottom: 5px;">Correo electrónico:</label>
                    <input type="email" name="correo" value="<?php echo $correoUsuario; ?>" readonly style="width:100%; margin-bottom:15px; padding:10px; border-radius:8px; border:1px solid #ddd; background:#f9f9f9;">

                    <label style="display: block; font-weight: 600; margin-bottom: 5px;">Tipo de incidencia:</label>
                    <select name="tipo_incidencia" id="tipo" onchange="checkOtro()" style="width:100%; padding:10px; border-radius:8px; border:1px solid #ddd; cursor: pointer;">
                        <option value="Atención en Recepción (Naomi/Luis)">Atención de Personal (Recepción/Operador)</option>
                        <option value="Veterinaria General (Dra. Carmen Soto)">Servicio Médico (Dra. Carmen Soto)</option>
                        <option value="Cirugía (Dr. Alejandro Perez)">Cirugía Veterinaria (Dr. Alejandro)</option>
                        <option value="Grooming (Sofia Gomez)">Grooming - Baño/Corte (Sofia Gomez)</option>
                        <option value="Administración (Mariana Ruiz)">Gestión Administrativa (Mariana Ruiz)</option>
                        <option value="Limpieza/Instalaciones">Limpieza e Instalaciones</option>
                        <option value="Otro">U otro (Especificar motivo)</option>
                    </select>

                    <div id="div_otro" style="display:none; margin-top:15px;">
                        <label style="display: block; font-weight: 600; color: #004aad; margin-bottom: 5px;">Especifique el motivo:</label>
                        <input type="text" name="otro_motivo" id="input_otro" placeholder="¿Cuál es el problema?" style="width:100%; padding:10px; border-radius:8px; border:2px solid #004aad;">
                    </div>
                </div>

                <!-- DERECHA: DESCRIPCIÓN Y EVIDENCIA -->
                <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display:flex; flex-direction:column;">
                    <h3 style="color: #004aad; margin-bottom: 15px;"><i class="fas fa-keyboard"></i> Detalle de la queja</h3>
                    
                    <label style="display: block; font-weight: 600; margin-bottom: 5px;">Descripción detallada:</label>
                    <textarea name="descripcion" placeholder="Describe lo sucedido con respeto para ayudarte..." required style="width:100%; height:120px; padding:15px; border-radius:8px; border:1px solid #ddd; resize:none; margin-bottom:15px; font-family: inherit;"></textarea>
                    
                    <!-- CASILLA DE ADJUNTAR ARCHIVO -->
                    <div style="border: 2px dashed #b5c7e3; border-radius: 12px; padding: 20px; text-align: center; background: #f8faff; margin-bottom: 10px;">
                        <i class="fas fa-file-image" style="font-size: 2rem; color: #004aad; margin-bottom: 10px;"></i>
                        <p style="margin: 0; font-weight: bold; color: #004aad;">Adjuntar foto / videos (evidencia)</p>
                        <p style="margin: 5px 0 10px 0; font-size: 0.85rem; color: #777;">Formatos permitidos: JPG, PNG, MP4 (Ancho máx. del servidor)</p>
                        <input type="file" name="evidencia" accept="image/jpeg, image/png, video/mp4" style="font-size: 0.9rem; color: #555;">
                    </div>
                    
                    <button type="submit" class="btn-add-appointment" style="margin-top:auto; width:100%; padding:15px; font-weight:bold; cursor: pointer;">
                        <i class="fas fa-paper-plane"></i> ENVIAR MI RECLAMO
                    </button>
                </div>
            </div>
        </form>
    </main>

    <script>
    function checkOtro() {
        var select = document.getElementById("tipo");
        var div = document.getElementById("div_otro");
        var input = document.getElementById("input_otro");
        if(select.value == "Otro") {
            div.style.display = "block";
            input.required = true;
        } else {
            div.style.display = "none";
            input.required = false;
            input.value = "";
        }
    }
    </script>
</body>
</html>