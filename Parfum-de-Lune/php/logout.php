<?php
session_start();          //Obrim la sessió (per poder tancar-la)
session_destroy();        //Eliminem totes les dades de la sessió
header("Location: /Parfum-de-Lune/html/menu-desplegable/usuari.php"); //Tornem al formulari de login
exit;
?>
