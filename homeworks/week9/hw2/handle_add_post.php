<?php
  require_once('conn.php');
  $comment = $_POST['comment'];
  $user_id = $_POST['user_id'];
  if(empty($comment)) {
    die('請檢查資料');
  }
  $sql = "INSERT INTO comments (user_id, content) VALUES ('$user_id','$comment')";
  $result = $conn->query($sql);
  header('location: index.php');
?>
