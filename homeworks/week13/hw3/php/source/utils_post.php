<?php
  class Post {
    private $table = 'ishin4554_comments';
    protected $conn;
    protected $post_id;
    public function __construct($connection, $id = 0){
      $this->conn = $connection;
      $this->post_id = $id;
    }
    
    public function readPost(){
      $sql = "SELECT user_id FROM $this->table WHERE id = ?";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('s', $this->post_id);
      $stmt->execute();
      $result = $stmt->get_result();
      if (empty($result)){
        return false;
      } else {
        return $result->fetch_assoc();
      } 
    }

    public function readPosts($user_id, $start, $length) {
      $sql = "SELECT ishin4554_users.nickname, $this->table.*, 
              COUNT(DISTINCT ishin4554_like_comment.id) AS likes,
              MAX(IF(ishin4554_like_comment.user_id = ?, 1, 0)) AS is_liked
              FROM $this->table
              LEFT JOIN ishin4554_users ON $this->table.user_id=ishin4554_users.id
              LEFT JOIN ishin4554_like_comment ON $this->table.id=ishin4554_like_comment.post_id
              WHERE $this->table.parent_id=0 
              AND $this->table.is_delete IS NULL 
              GROUP BY $this->table.id
              ORDER BY $this->table.time DESC
              LIMIT ?, ?";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('iii',$user_id ,$start, $length);
      $stmt->execute();
      $result = $stmt->get_result();
      if (empty($result)){
        return false;
      } else {
        return $result;
      } 
    }

    public function readChildPosts($user_id, $parent_id) {
      $sql = "SELECT ishin4554_users.nickname, $this->table.*, 
              COUNT(DISTINCT ishin4554_like_comment.id) AS likes,
              MAX(IF(ishin4554_like_comment.user_id = ?, 1, 0)) AS is_liked
              FROM $this->table
              LEFT JOIN ishin4554_users ON $this->table.user_id=ishin4554_users.id
              LEFT JOIN ishin4554_like_comment ON $this->table.id=ishin4554_like_comment.post_id
              WHERE $this->table.parent_id=?
              AND $this->table.is_delete IS NULL 
              GROUP BY $this->table.id
              ORDER BY $this->table.time ASC";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('ii', $user_id, $parent_id);
      $stmt->execute();
      $result = $stmt->get_result();
      if (empty($result)){
        return false;
      } else {
        return $result;
      } 
    }

    public function updatePost($content) {
      $sql = "UPDATE $this->table SET content =? WHERE id =?";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('ss', $content, $this->post_id);
      $stmt->execute();
    }

    public function createPost($content, $user_id, $parent_post_id = 0) {
      $sql = "INSERT INTO $this->table (user_id, content, parent_id) VALUES (?,?,?)";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('iss', $user_id, $content, $parent_post_id);
      $stmt->execute();
    }

    public function deletePost(){
      $sql = "UPDATE $this->table SET is_delete=true WHERE id = ?";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('s', $this->post_id);
      $stmt->execute();
    }

    public function getCommentLength(){
      $sql = "SELECT COUNT(*) FROM ishin4554_comments 
              WHERE parent_id = 0 AND is_delete IS NULL";
      $result = $this->conn->query($sql);
      $length = $result->fetch_assoc();
      return $length['COUNT(*)'];
    }
  }
class Like extends Post {
    private $table = 'ishin4554_like_comment';
    private $user_id;
    public function __construct($connection, $post, $id){
      parent::__construct($connection, $post);
      $this->user_id = $id;
    }
    public function readLike(){
      $sql = "SELECT COUNT(*) FROM $this->table WHERE post_id=?";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('i', $this->post_id);
      $stmt->execute();
      $result = $stmt->get_result();
      return $result->fetch_assoc()['COUNT(*)'];
    }
    public function toggleLike(){
      $sql = "SELECT * FROM $this->table WHERE user_id=? AND post_id=?";
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('ii', $this->user_id, $this->post_id);
      $stmt->execute();
      $result = $stmt->get_result()->fetch_assoc();
      if (empty($result)){
        $sql = "INSERT INTO ishin4554_like_comment(user_id, post_id) VALUES (?,?)";
      } else {
        $sql = "DELETE FROM $this->table WHERE user_id=? AND post_id=?";
      } 
      $stmt = $this->conn->prepare($sql);
      $stmt->bind_param('ii', $this->user_id, $this->post_id);
      $stmt->execute();
    }
  }
?>