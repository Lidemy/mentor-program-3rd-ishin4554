<?php
  require_once('conn.php');
  $post_id = $_GET['id'];
  $sql = "DELETE FROM ishin4554_comments WHERE id = '$post_id'";
  
  if ($conn->query($sql)) {
    header('Location: ./index.php?page=0');
  } else {
    echo $conn->$error;
  }
?>