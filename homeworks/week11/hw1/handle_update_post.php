<?php
  require_once('conn.php');
  require_once('source/utils_post.php');
  $post_id = $_POST['id'];
  $content = $_POST['comment'];
  $post = new Post($conn, $post_id);
  $post->updatePost($content);
?>