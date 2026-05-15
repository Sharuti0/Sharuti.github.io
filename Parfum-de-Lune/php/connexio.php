<?php
//Classe de connexio
class Connexio {
    private $host = "localhost";
    private $dbname = "parfumdelune";
    private $usuari = "root";
    private $contrasenya = "";
    private $pdo;

    public function connectar() {
        if (!$this->pdo) {
            $dsn = "mysql:host=$this->host;dbname=$this->dbname;charset=utf8";
            try {
                $this->pdo = new PDO($dsn, $this->usuari, $this->contrasenya);
                $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                die("Error de connexió: " . $e->getMessage());
            }
        }
        return $this->pdo;
    }
}
?>
