<?php
  require_once('conn.php');
  require_once('source/utils_post.php');
  $post_id = $_GET['post_id'];
  $user_id = $_GET['user_id'];
  $like = new Like($conn, $post_id, $user_id);
  if($like->getLike()){
    $like->removeLike();
  } else {
    $like->addLike();
  }
  $num = $like->getAllLike();
  $response = array('like_count'=>$num);
  echo json_encode($response);
?>