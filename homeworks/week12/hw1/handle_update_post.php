<?php
  require_once('conn.php');
  require_once('source/utils_post.php');
  $post_id = $_POST['id'];
  $content = $_POST['comment'];
  $post = new Post($conn, $post_id);
  $row = $post->readPost();
  $post->updatePost($content);
  header('Location: index.php?page=0');
?>