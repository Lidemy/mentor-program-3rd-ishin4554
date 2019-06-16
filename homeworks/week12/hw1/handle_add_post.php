<?php
  require_once('conn.php');
  require_once('source/utils_post.php');
  $comment = $_POST['comment'];
  $user_id = $_POST['user_id'];
  $post_id = $_POST['post_id'];
  if(empty($comment)) {
    echo "<script>
          alert('請輸入內容');
          location = 'index.php?page=0';
        </script>";
  } else {
    $post = new Post($conn);
    $post->addPost($comment, $user_id,$post_id);
    header('location: index.php?page=0');
  }
?>
