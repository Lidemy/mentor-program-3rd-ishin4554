<?php
  require_once('conn.php');
  $post_id = $_POST['id'];
  $content = $_POST['comment'];
  $sql = "UPDATE ishin4554_comments SET content = '$content' WHERE id = $post_id";
  if ($conn->query($sql)) {
    header('Location: ./index.php?page=0');
  } else {
    echo $conn->$error;
  }
?>