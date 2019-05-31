<?php
  class Post {
    private $table = 'ishin4554_comments';
    private $conn;
    private $id;
    public function __construct($connection, $post_id = 0){
      $this->conn = $connection;
      $this->id = $post_id;
    }

    public function readPost() {
      $sql = "SELECT content FROM $this->table WHERE id = '$this->id'";
      $result = $this->conn->query($sql);
      return $row = $result->fetch_assoc();
    }

    public function updatePost($content) {
      $sql = "UPDATE $this->table SET content = '$content' WHERE id = '$this->id'";
      if ($this->conn->query($sql)) {
        header('Location: ./index.php?page=0');
      } else {
        echo $this->conn->$error;
      }
    }

    public function addPost($content, $user_id) {
      $sql = "INSERT INTO $this->table (user_id, content) VALUES ('$user_id','$content')";
      $this->conn->query($sql);    
    }

    public function deletePost(){
      $sql = "DELETE FROM $this->table WHERE id = '$this->id'";
      if ($this->conn->query($sql)) {
        header('Location: ./index.php?page=0');
      } else {
        echo $this->conn->$error;
      }
    }

    public function getCommentLength(){
      $result = $this->conn->query("SELECT COUNT(*) FROM ishin4554_comments");
      $length = $result->fetch_assoc();
      return $length['COUNT(*)'];
    }
  }
?>