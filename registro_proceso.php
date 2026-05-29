<?php
include 'conexion.php';
session_start();

if (!isset($_SESSION['usuario'])) { 
    exit("Acceso no autorizado"); 
}

// Iniciamos el buffer para evitar que espacios en blanco rompan la respuesta
ob_start();

$nombre    = $_POST['nombre_completo'];
$dni       = $_POST['dni'];
$telefono  = $_POST['telefono'];
$correo    = $_POST['correo'];
$tipo      = $_POST['tipo_incidencia'];
$desc      = mysqli_real_escape_string($conexion, $_POST['descripcion']);

if ($tipo === "Otro" && !empty($_POST['otro_motivo'])) {
    $tipo = "Otro: " . mysqli_real_escape_string($conexion, $_POST['otro_motivo']);
}

$nombreArchivoDb = ""; 
if (isset($_FILES['evidencia']) && $_FILES['evidencia']['error'] == 0) {
    $nuevoNombre = time() . "_" . $_FILES['evidencia']['name'];
    if (move_uploaded_file($_FILES['evidencia']['tmp_name'], "uploads/" . $nuevoNombre)) {
        $nombreArchivoDb = $nuevoNombre; 
    }
}

// Consulta SQL hacia la tabla 'reclamos'
$sql = "INSERT INTO reclamos (nombre_completo, dni, telefono, correo_electronico, tipo_incidencia, descripcion, evidencia) 
        VALUES ('$nombre', '$dni', '$telefono', '$correo', '$tipo', '$desc', '$nombreArchivoDb')";

// Limpiamos cualquier salida previa del buffer antes de responder
ob_clean();

if (mysqli_query($conexion, $sql)) {
    echo "success";
} else {
    // Si falla la inserción, mandamos el error exacto de MySQL para identificar la columna incorrecta
    echo "Detalle del error: " . mysqli_error($conexion);
}

mysqli_close($conexion);
exit();
?>