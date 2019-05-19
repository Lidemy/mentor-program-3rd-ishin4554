<?php
  class Table {
    private $sql = "";
    private $conn = "";
    public function __construct($sql, $conn){
      $this->sql = $sql;
      $this->conn = $conn;
    }
    public function createRow($conn, $sql){
      $conn->query($sql);
    }
    public function readTable($conn, $sql){
      return $conn->query($sql);
    }
    public function update($conn, $sql){
      $conn->query($sql);
    }
    public function delete($conn, $sql){
      $conn->query($sql);
    }
  }
?>

