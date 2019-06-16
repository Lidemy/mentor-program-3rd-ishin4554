<?php
  class User {
    private $table = 'ishin4554_users';
    protected $conn;
    protected $username;
    public function __construct($connection, $name = 0){
      $this->conn = $connection;
      $this->username = $name;
    }
    function checkUser(){
      $sql = "SELECT * FROM $this->table WHERE username=?";
      $result = $this->conn->prepare($sql);
      $result->bind_param('s', $this->username);
      $result->execute();
      return empty($result);
    }
    function createUser($password, $nickname){
      $sql =  "INSERT INTO $this->table(username, password, nickname) VALUES(?,?,?)";
      $result = $this->conn->prepare($sql);
      $result->bind_param('sss', $this->username, $password, $nickname);
      $result->execute();
      return empty($result);
    }
    function readUserByName(){
      $sql = "SELECT * FROM $this->table WHERE username=?";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('s', $this->username);
      $stmt->execute();
      $result = $stmt->get_result();
      if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row;
      } else {
        echo 'error post';
      }
    }
    function readUserById($id){
      $sql = "SELECT * FROM $this->table WHERE id=?";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('s', $id);
      $stmt->execute();
      $result = $stmt->get_result();
      if ($result->num_rows > 0) {
        return $row = $result->fetch_assoc();
      } else {
        echo 'error post';
      }
    }
  }

  class Session extends User {
    private $table = 'ishin4554_users_certificate';
    private $id;
    public function __construct($connection, $name, $sessionID = 0){
      parent::__construct($connection, $name);
      $this->id = $sessionID;
    }

    public function readSession() {
      $sql = "SELECT * FROM $this->table WHERE id = '$this->id'";
      $result = $this->conn->query($sql);
      $row = $result->fetch_assoc();
      return $row['username'];
    }
    public function setSession(){
      $sql = "SELECT username FROM $this->table WHERE username = '$this->username'";
      $result = $this->conn->query($sql);
      $row = $result->fetch_assoc();
      $value = $this->rndSession();
      if ($row) {
        $sql = "UPDATE $this->table SET id = '$value' WHERE username = '$this->username'";
      } else {
        $sql = "INSERT INTO $this->table(id, username) VALUES('$value','$this->username')";
      }
      $this->conn->query($sql);
      return $value;
    }
    function rndSession() {
      $pattern = "1234567890abcdefghijklmnopqrstuvwxyz";
      $key = "";
      for ($i = 0; $i < 32; $i ++) {
        $key .= $pattern[rand(0,35)];
      }
      return $key;
    }
  }