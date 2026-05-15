<?php
session_start();
header('Content-Type: application/json');
require_once "../connexio.php";
$bd = new Connexio();
$conn = $bd->connectar();

// Comprovem que l'usuari és administrador
if (!isset($_SESSION['id']) || $_SESSION['rol'] !== 'admin') {
    echo json_encode(["error" => "Accés denegat"]);
    exit;
}

$accio = $_GET['accio'] ?? '';

switch ($accio) {
    case 'llistar':
        $stmt = $conn->prepare("SELECT id, nom, email, rol FROM usuaris");
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'eliminar':
        $id = intval($_POST['id'] ?? 0);
        if ($id > 0) {
            $stmt = $conn->prepare("DELETE FROM usuaris WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            echo json_encode(["missatge" => "Usuari eliminat"]);
        } else {
            echo json_encode(["error" => "ID invàlid"]);
        }
        break;

    case 'actualitzar':
        $id = intval($_POST['id'] ?? 0);
        $nom = trim($_POST['nom'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $rol = trim($_POST['rol'] ?? 'usuari');

        if ($id > 0 && $nom !== '' && $email !== '') {
            $stmt = $conn->prepare("UPDATE usuaris SET nom = :nom, email = :email, rol = :rol WHERE id = :id");
            $stmt->bindParam(':nom', $nom);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':rol', $rol);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            echo json_encode(["missatge" => "Usuari actualitzat"]);
        } else {
            echo json_encode(["error" => "Dades incorrectes"]);
        }
        break;

    default:
        echo json_encode(["error" => "Acció no reconeguda"]);
}
?>
