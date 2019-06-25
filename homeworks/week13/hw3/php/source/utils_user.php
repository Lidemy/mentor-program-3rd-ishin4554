<?php
  class User {
    private $table = 'ishin4554_users';
    protected $conn;
    protected $user_id;
    public function __construct($connection, $id = 0){
      $this->conn = $connection;
      $this->user_id = $id;
    }

    public function createUser($username, $password, $nickname){
      $sql =  "INSERT INTO $this->table(username, password, nickname) VALUES(?,?,?)";
      $result = $this->conn->prepare($sql);
      $result->bind_param('sss', $username, $password, $nickname);
      $result->execute();
      return empty($result);
    }

    public function readUsers(){
      $sql = "SELECT permission, nickname, id FROM $this->table";
      $result = $this->conn->query($sql);
      return $result;
    }

    public function readUserByName($username){
      $sql = "SELECT * FROM $this->table WHERE username=?";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('s', $username);
      $stmt->execute();
      $result = $stmt->get_result();
      if (empty($result)){
        return false;
      } else {
        return $result->fetch_assoc();
      }  
    }

    public function readUserById(){
      $sql = "SELECT * FROM $this->table WHERE id=?";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('i', $this->user_id);
      $stmt->execute();
      $result = $stmt->get_result();
      if (empty($result)){
        return false;
      } else {
        return $result->fetch_assoc();
      }  
    }

    public function updateUserPermission(){
      $sql = "UPDATE $this->table SET permission = IF(permission='normal', 'admin', 'normal') WHERE id = ?";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('i', $this->user_id);
      $stmt->execute();
    }
  }

  class Session {
    private $table = 'ishin4554_users_certificate';
    private $user_id;
    private $conn;
    public function __construct($connection, $id = 0){
      $this->conn = $connection;
      $this->user_id = $id;
    }

    public function readSession($sessionID) {
      $sql = "SELECT $this->table.user_id, ishin4554_users.nickname, ishin4554_users.permission FROM $this->table 
              LEFT JOIN ishin4554_users ON $this->table.user_id=ishin4554_users.id
              WHERE $this->table.id=?";
      $result = $this->conn->prepare($sql);
      $result->bind_param('s', $sessionID);
      $result->execute();
      $data = $result->get_result();
      if (empty($data)){
        return false;
      } else {
        return $data->fetch_assoc();
      } 
    }
    private function readSessionByUser(){
      $sql = "SELECT * FROM $this->table WHERE user_id=?";
      $result = $this->conn->prepare($sql);
      $result->bind_param('s', $this->user_id);
      $result->execute();
      $data = $result->get_result();
      if (empty($data)){
        return false;
      } else {
        return $data->fetch_assoc();
      } 
    }

    public function setSession(){
      $sql = "REPLACE INTO $this->table(id, user_id) VALUES (?,?)";
      $result = $this->conn->prepare($sql);
      $sessionID = $this->rndSession();
      $result->bind_param('si', $sessionID, $this->user_id);
      $result->execute();
      return $sessionID;
    }
    
    public function rndSession() {
      $pattern = "1234567890abcdefghijklmnopqrstuvwxyz";
      $key = "";
      for ($i = 0; $i < 32; $i ++) {
        $key .= $pattern[rand(0,35)];
      }
      return $key;
    }
  }
?>