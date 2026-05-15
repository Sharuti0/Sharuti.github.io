<?php
/**
 * Controlador de cistella
 * Gestiona les accions: afegir, llistar, eliminar i buidar la cistella
 * segons l'usuari loguejat via $_SESSION['id'].
 */
session_start(); // Inicia la sessió per saber quin usuari està connectat
header('Content-Type: application/json'); // resposta serà en format JSON
require_once "../connexio.php"; 
$bd = new Connexio();
$conn = $bd->connectar();

if (!isset($_SESSION['id'])) {
    echo json_encode(["missatge" => "No has iniciat sessió.", "tipus" => "error"]);
    exit;
}

$idUsuari = $_SESSION['id']; // Guardem l'ID de l'usuari connectat
$accio = $_GET['accio'] ?? ''; 

// Segons l'acció, fem una cosa o una altra
switch ($accio) {

    /**
    * Afegeix un producte a la cistella.
    * Requereix $_POST['nom'] i $_POST['preu'].
    */
    case 'afegir': // Si volem afegir un producte a la cistella

        // Rebem el nom i el preu des del formulari (enviats amb fetch POST)
        $nom = htmlspecialchars(trim($_POST['nom'] ?? ''));
        $preu = ($_POST['preu'] ?? 0); // Convertim el valor a número decimal

        // Comprovem que les dades són correctes
        if ($nom === '' || $preu <= 0) {
            echo json_encode(["missatge" => "Dades incorrectes.", "tipus" => "error"]);
            exit;
        }

        // Preparem la consulta per inserir el producte a la base de dades
        $sql = "INSERT INTO cistella (id_usuari, nom_producte, preu) VALUES (:id, :nom, :preu)";
        $stmt = $conn->prepare($sql); // Consulta segura
        $stmt->bindParam(':id', $idUsuari); // Associem el valor real a :id
        $stmt->bindParam(':nom', $nom); // Associem el valor del nom
        $stmt->bindParam(':preu', $preu); // Associem el valor del preu

        // Si tot va bé
        if ($stmt->execute()) {
            echo json_encode(["missatge" => "$nom afegit correctament!", "tipus" => "correcte"]);
        } else {
            echo json_encode(["missatge" => "Error en afegir el producte.", "tipus" => "error"]);
        }
        break;

    /**
    * Retorna els productes de la cistella de l'usuari loguejat.
    */
    case 'llistar': // Si volem mostrar els productes de la cistella
        $stmt = $conn->prepare("SELECT id, nom_producte, preu FROM cistella WHERE id_usuari = :id");
        $stmt->bindParam(':id', $idUsuari); // Només els productes de l'usuari loguejat
        $stmt->execute();
        $productes = $stmt->fetchAll(PDO::FETCH_ASSOC); // Agafem tots els productes com array associatiu
        echo json_encode($productes); // Retornem els productes en format JSON
        break;

    /**
    * Elimina un producte concret de la cistella per ID.
    * Requereix $_POST['id'].
    */
    case 'eliminar': // Si volem eliminar un producte concret de la cistella
        $idProducte = intval($_POST['id'] ?? 0); // Agafem l’ID del producte enviat per POST

        // Comprovem si és un ID vàlid
        if ($idProducte <= 0) {
            echo json_encode(["missatge" => "ID invàlid", "tipus" => "error"]);
            exit;
        }

        // Elimina el producte amb aquell ID, però només si és de l’usuari actual
        $stmt = $conn->prepare("DELETE FROM cistella WHERE id = :id AND id_usuari = :usuari");
        $stmt->bindParam(':id', $idProducte);
        $stmt->bindParam(':usuari', $idUsuari);
        $stmt->execute();
        echo json_encode(["missatge" => "Producte eliminat", "tipus" => "correcte"]);
        break;

    /**
    * Buida tota la cistella de l'usuari.
    * Elimina tots els productes associats al seu id_usuari.
    * Retorna un missatge JSON.
    */
    case 'buidar': // Si volem buidar tota la cistella de l'usuari
        $stmt = $conn->prepare("DELETE FROM cistella WHERE id_usuari = :id");
        $stmt->bindParam(':id', $idUsuari);
        $stmt->execute();
        echo json_encode(["missatge" => "Cistella buidada", "tipus" => "correcte"]);
        break;

    default: // Si no coincideix amb cap acció coneguda
        echo json_encode(["missatge" => "Acció no reconeguda", "tipus" => "error"]);
}
?>