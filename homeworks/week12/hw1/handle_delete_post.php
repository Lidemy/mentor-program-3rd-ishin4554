<?php
  require_once('conn.php');
  require_once('source/utils_post.php');
  $post_id = $_GET['id'];
  $post = new Post($conn, $post_id);
  $post->deletePost(); 
?>