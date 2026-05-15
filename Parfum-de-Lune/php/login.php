<?php
session_start();
header('Content-Type: application/json'); //Indicarem que retornarem resposta JSON

require_once "connexio.php"; 
$bd = new Connexio();
$conn = $bd->connectar();

//Rebem les dades del formulari
$email = trim($_POST['email'] ?? '');
$pass  = trim($_POST['contrasenya'] ?? '');

//Comprovem que no hi hagi camps buits
if ($email === '' || $pass === '') {
    echo json_encode([
        "missatge" => "Falten camps per omplir.",
        "tipus" => "error"
    ]);
    exit;
}

//Busquem l'usuari pel correu
$consulta = $conn->prepare("SELECT id, nom, contrasenya, rol FROM usuaris WHERE email = :email");
$consulta->bindParam(':email', $email);
$consulta->execute();
$usuari = $consulta->fetch(PDO::FETCH_ASSOC);

//Comprovem si l'usuari existeix i la contrasenya coincideix
if ($usuari && $usuari['contrasenya'] === $pass) {
    $_SESSION['id'] = $usuari['id'];       //Guardem l'ID a la sessió
    $_SESSION['nom'] = $usuari['nom'];     //També el nom (per mostrar-lo després)
    $_SESSION['rol'] = $usuari['rol'];     //Guardar el rol

    echo json_encode([
        "missatge" => "Sessió iniciada! Benvingut/da, {$usuari['nom']}.",
        "tipus" => "correcte"
    ]);
    exit;
}

//Si no coincideix
echo json_encode([
    "missatge" => "Correu electrònic o contrasenya incorrectes.",
    "tipus" => "error"
]);