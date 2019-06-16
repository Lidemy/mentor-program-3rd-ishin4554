<?php
  require_once 'conn.php';
  require_once 'source/utils_post.php';
  require_once 'source/utils_user.php';
  $post_id = $_GET['post_id'];
  $child_result = new Post($conn, $post_id);
  $child_posts = $child_result->getLevelComments();
  $content_list = array();
  while($child_post = $child_posts->fetch_assoc()){
    $child_post_id = $child_post['lv2'];
    $child_comment_post = new Post($conn, $child_post_id);
    $child_comment = $child_comment_post->readPost();
    $child_user_id = $child_comment['user_id'];
    $child_post_user = new User($conn, $child_user_id);
    $post_indo = array(
    "post_id"=> $child_post_id, 
    "user_id"=>$child_user_id,
    "nickname"=>$child_post_user->readUserById($child_user_id)['nickname'], 
    "time"=>$child_comment['time'],
    "content"=>$child_comment['content']);
    array_push($content_list, $post_indo);
  }
  echo json_encode($content_list);
?>