
<?php
  class User {
    private $table = 'ishin4554_todo_users';
    protected $conn;
    protected $user_id;
    public function __construct($connection, $id = 0){
      $this->conn = $connection;
      $this->user_id = $id;
    }

    public function readUserByName($username){
      $sql = "SELECT * FROM $this->table WHERE username = ?";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('s', $username);
      $stmt->execute();
      $data = $stmt->get_result();
      if (empty($data)){
        return false;
      } else {
        return $data->fetch_assoc();
      }   
    }
    public function readAllUser(){
      $sql = "SELECT * FROM $this->table";
      $result = $this->conn->query($sql);
      return $result;   
    }
    public function readUser(){
      $sql = "SELECT * FROM $this->table WHERE id=?";
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
    public function createUser($username, $password, $nickname){
      $sql =  "INSERT INTO 
      $this->table(username, password, nickname) VALUES(?,?,?)";
      $result = $this->conn->prepare($sql);
      $result->bind_param('sss', $username, $password, $nickname);
      $result->execute();
      return empty($result);
    }
    public function updateUser($intro='...', $nickname='#', $github_url='#'){
      $sql = "UPDATE $this->table SET intro=?, nickname=? ,github_url=? WHERE id=?";
      $result = $this->conn->prepare($sql);
      $result->bind_param('sss', $intro, $nickname, $github_url);
      if ($result->execute()) {
      } else {
        echo $this->conn->$error;
      }
    }
    public function deleteUser(){
      $sql = "UPDATE $this->table SET is_delete=true WHERE id=?";
      $result = $this->conn->prepare($sql);
      $result->bind_param('i', $this->id);
      if ($result->execute()) {
      } else {
        echo $this->conn->$error;
      }
    }
  }

  class Session {
    private $table = 'ishin4554_todo_certificate';
    private $user_id;
    private $conn;
    public function __construct($connection, $id = 0){
      $this->conn = $connection;
      $this->user_id = $id;
    }

    public function readSession($sessionID) {
      $sql = "SELECT * FROM $this->table WHERE id=?";
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
      if($this->readSessionByUser()){
        $sql = "UPDATE $this->table SET id=? WHERE user_id=?";
      } else {
        $sql = "INSERT INTO $this->table(id, user_id) VALUES (?,?)";
      }
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