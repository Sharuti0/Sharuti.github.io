<?php
session_start();
header('Content-Type: application/json');

// Si hi ha sessió, retornem nom i confirmem que està loguejat
if (isset($_SESSION['id']) && isset($_SESSION['nom'])) {
    echo json_encode([
        "logejat" => true,
        "nom" => $_SESSION['nom']
    ]);
} else {
    // Si no hi ha sessió, retornem que no està loguejat
    echo json_encode([
        "logejat" => false
    ]);
}
?>