<?php
  require_once('conn.php');
  require_once('source/utils_post.php');
  include_once('template/navbar.php');
  $post_id = $_GET['id'];
  $post = new Post($conn, $post_id);
  $row = $post->readPost();
  if ($row['user_id'] === $user_id || $permission !== 'noraml') {
    $post->deletePost(); 
  }
  header('location: index.php?page=0');
?>