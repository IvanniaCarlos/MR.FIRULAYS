<?php
include 'conexion.php';
session_start();

if (!isset($_SESSION['usuario'])) {
    header("Location: index.php");
    exit();
}

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
    $nombreOriginal = $_FILES['evidencia']['name'];
    $rutaTemporal   = $_FILES['evidencia']['tmp_name'];
    
    $nuevoNombre    = time() . "_" . $nombreOriginal;
    $carpetaDestino = "uploads/" . $nuevoNombre;
    
    if (move_uploaded_file($rutaTemporal, $carpetaDestino)) {
        $nombreArchivoDb = $nuevoNombre; 
    }
}


$sql = "INSERT INTO reclamos (nombre_completo, dni, telefono, correo_electronico, tipo_incidencia, descripcion, evidencia) 
        VALUES ('$nombre', '$dni', '$telefono', '$correo', '$tipo', '$desc', '$nombreArchivoDb')";

if (mysqli_query($conexion, $sql)) {
    echo "<script>
            alert('¡Reclamo enviado correctamente con su evidencia! Gracias por tu feedback.');
            window.location.href = 'reclamos.php';
        </script>";
} else {
    echo "Error interno de base de datos al guardar: " . mysqli_error($conexion);
}

mysqli_close($conexion);
?>