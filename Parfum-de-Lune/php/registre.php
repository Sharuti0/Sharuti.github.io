<?php
//Iniciem la sessió
session_start();

//Indiquem que la resposta serà JSON
header('Content-Type: application/json');

//Connectem amb la base de dades
require_once "connexio.php";
$bd = new Connexio();
$conn = $bd->connectar();

//Recollim les dades enviades pel formulari
$nom        = htmlspecialchars(trim($_POST['nom'] ?? ''));
$email      = htmlspecialchars(trim($_POST['email'] ?? ''));
$contrasenya = trim($_POST['contrasenya'] ?? '');

//Comprovem que cap camp estigui buit
if ($nom === '' || $email === '' || $contrasenya === '') {
    echo json_encode([
        "missatge" => "Falten camps per omplir.",
        "tipus" => "error"
    ]);
    exit;
}

//Comprovem si el correu ja existeix
$consulta = $conn->prepare("SELECT * FROM usuaris WHERE email = :email");
$consulta->bindParam(':email', $email);
$consulta->execute();

if ($consulta->rowCount() > 0) {
    echo json_encode([
        "missatge" => "Aquest correu electrònic ja està registrat.",
        "tipus" => "error"
    ]);
    exit;
}

//Inserim l'usuari nou
$insercio = $conn->prepare("INSERT INTO usuaris (nom, email, contrasenya) VALUES (:nom, :email, :contrasenya)");
$insercio->bindParam(':nom', $nom);
$insercio->bindParam(':email', $email);
$insercio->bindParam(':contrasenya', $contrasenya);

if ($insercio->execute()) {
    echo json_encode([
        "missatge" => "Usuari registrat correctament!",
        "tipus" => "correcte"
    ]);
} else {
    echo json_encode([
        "missatge" => "Error en registrar l’usuari.",
        "tipus" => "error"
    ]);
}
?>
