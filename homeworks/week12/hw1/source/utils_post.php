<?php
  class Post {
    private $table = 'ishin4554_comments';
    protected $conn;
    protected $id;
    public function __construct($connection, $post_id = 0){
      $this->conn = $connection;
      $this->id = $post_id;
    }

    public function readPost() {
      $sql = "SELECT * FROM $this->table WHERE id=?";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('s', $this->id);
      $stmt->execute();
      $result = $stmt->get_result();
      if ($result->num_rows > 0) {
        return $row = $result->fetch_assoc();
      } else {
        echo 'error post';
      }
    }

    public function updatePost($content) {
      $sql = "UPDATE $this->table SET content = '$content' WHERE id = '$this->id'";
      if ($this->conn->query($sql)) {
        header('Location: ./index.php?page=0');
      } else {
        echo $this->conn->$error;
      }
    }

    public function addPost($content, $user_id, $post_id) {
      $sql = "INSERT INTO $this->table (user_id, content, parent_id) VALUES ('$user_id','$content', '$post_id')";
      $this->conn->query($sql);    
    }

    public function deletePost(){
      $sql = "UPDATE $this->table SET is_delete=true WHERE id = '$this->id'";
      if ($this->conn->query($sql)) {
        header('Location: ./index.php?page=0');
      } else {
        echo $this->conn->$error;
      }
    }

    public function getCommentLength($is_all){
      if($is_all) {
        $result = $this->conn->query("SELECT COUNT(*) FROM ishin4554_comments");
      } else {
        $result = $this->conn->query("SELECT COUNT(*) FROM ishin4554_comments WHERE parent_id = 0 AND is_delete IS NULL");
      }
      $length = $result->fetch_assoc();
      return $length['COUNT(*)'];
    }

    public function getLevelComments(){
      $sql = "SELECT t2.id AS lv2
      FROM ishin4554_comments AS t1
      LEFT JOIN ishin4554_comments AS t2 ON t2.parent_id = t1.id
      WHERE t1.id = '$this->id'";
      $result = $this->conn->query($sql);
      return $result;
    }
  }
class Like extends Post {
    private $table = 'ishin4554_like_comment';
    private $user_id;
    public function __construct($connection, $post, $user){
      parent::__construct($connection, $post);
      $this->user_id = $user;
    }
    public function getAllLike(){
      $sql = "SELECT COUNT(*) FROM $this->table WHERE comment_id = '$this->id'";
      $result = $this->conn->query($sql);
      $all_like = $result->fetch_assoc()['COUNT(*)'];
      return (integer)$all_like;
    }
    public function getLike(){
      $sql = "SELECT COUNT(*) FROM $this->table WHERE user_id = '$this->user_id' AND comment_id = '$this->id'";
      $result = $this->conn->query($sql);
      $like = $result->fetch_assoc()['COUNT(*)'];
      return (integer)$like;
    }
    public function addLike(){
      $sql = "INSERT INTO $this->table (user_id, comment_id) VALUES ('$this->user_id','$this->id')";
      $this->conn->query($sql);
    }
    public function removeLike(){
      $sql = "DELETE FROM $this->table WHERE user_id = '$this->user_id' AND comment_id = '$this->id'";
      $this->conn->query($sql);
    }
  }
?>