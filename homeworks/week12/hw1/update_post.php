<?php
  include_once('./template/navbar.php');
  require_once('conn.php');
  require_once('source/utils_post.php');
  $post_id = $_GET['id'];
  $post = new Post($conn, $post_id);
  $row = $post->readPost();
  $post_user_id = $row['user_id'];
  if($is_login){
    if ($post_user_id === $user_id) {
      $content = $row['content'];
      include_once('./template/input.php');
    } 
  }else {
    header('location: index.php?page=0');
  }
?>