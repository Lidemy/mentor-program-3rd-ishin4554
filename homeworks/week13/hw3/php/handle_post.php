<?php
require_once('./source/conn.php');
require_once('./source/utils_post.php');
require_once('./source/utils_user.php');

$data = json_decode(file_get_contents('php://input'));
$dbclass = new DBClass();
$conn = $dbclass->getConnection();
$auth = getallheaders()['Auth'];
$session = new Session($conn);
if(!empty($session->readSession($auth)['user_id'])){
  $auth_id = (integer)$session->readSession($auth)['user_id'];
  $permission = $session->readSession($auth);
}else{
  $auth_id = 'logout';
  $permission = null;
}

// readAll
if($_SERVER['REQUEST_METHOD']=='GET' && !isset($_GET['post_id'])){
  http_response_code(200);
  $data = new Post($conn);
  $limit = 5;
  $page = (integer)$_GET['page'];
  $total = $data->getCommentLength();

  // Links 
  $prev = $page -1;
  $next = $page +1;
  if($page>1 && ($page*$limit) < $total){
    $links = Array(
      "now"=>"$page",
      "prev"=>"./posts?page=$prev",
      "next"=>"./posts?page=$next",
    );
  } else if($page<=1){
    $links = Array(
      "now"=>"$page",
      "next"=>"./posts?page=$next",
    );
  } else if($page>1 && ($page*$limit) > $total){
    $links = Array(
      "now"=>"$page",
      "prev"=>"./posts?page=$prev",
    );
  } else {
    $links = Array(
      "now"=>"$page",
    );
  }

  // return result 
  $allPosts = $data->readPosts($auth_id, $prev*$limit,$limit);

  $posts = Array();
  while($row = $allPosts->fetch_assoc()){
    $post = Array(
      "post_id"=>htmlspecialchars($row['id'], ENT_QUOTES, 'UTF-8'),
      "user_id"=>htmlspecialchars($row['user_id'], ENT_QUOTES, 'UTF-8'),
      "nickname"=>htmlspecialchars($row['nickname'], ENT_QUOTES, 'UTF-8'),
      "parent_id"=>htmlspecialchars($row['parent_id'], ENT_QUOTES, 'UTF-8'),
      "content"=>htmlspecialchars($row['content'], ENT_QUOTES, 'UTF-8'),
      "time"=>htmlspecialchars($row['time'], ENT_QUOTES, 'UTF-8'),
      "likes"=>htmlspecialchars($row['likes'], ENT_QUOTES, 'UTF-8'),
      "is_liked"=>htmlspecialchars($row['is_liked'], ENT_QUOTES, 'UTF-8'),
    );
    array_push($posts, $post);
  }
  $response = Array(
    "type"=>'success',
    "state"=>$auth_id,
    "content"=>$posts,
    "links"=>$links,
    "permission"=>$permission
  );
  echo json_encode($response);
}

// readSingle
if($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['post_id'])){
  http_response_code(200);
  $data = new Post($conn);
  $allPosts = $data->readChildPosts($auth_id ,(integer)$_GET['post_id']);
  $posts = Array();
  if($allPosts){
    while($row = $allPosts->fetch_assoc()){
      $post = Array(
        "post_id"=>htmlspecialchars($row['id'], ENT_QUOTES, 'UTF-8'),
        "user_id"=>htmlspecialchars($row['user_id'], ENT_QUOTES, 'UTF-8'),
        "nickname"=>htmlspecialchars($row['nickname'], ENT_QUOTES, 'UTF-8'),
        "parent_id"=>htmlspecialchars($row['parent_id'], ENT_QUOTES, 'UTF-8'),
        "content"=>htmlspecialchars($row['content'], ENT_QUOTES, 'UTF-8'),
        "time"=>htmlspecialchars($row['time'], ENT_QUOTES, 'UTF-8'),
        "likes"=>htmlspecialchars($row['likes'], ENT_QUOTES, 'UTF-8'),
        "is_liked"=>htmlspecialchars($row['is_liked'], ENT_QUOTES, 'UTF-8'),
      );
      array_push($posts, $post);
    }
    $response = Array(
      "type"=>'success',
      "state"=>$auth_id,
      "content"=>$posts,
      "permission"=>$permission
    );
  } else {
    $response = Array(
      "state"=>'fail',
      "type"=>'fail'
    );
  }
  
  echo json_encode($response);
}

// create
if($_SERVER['REQUEST_METHOD']=='POST'){
  $data = json_decode(file_get_contents('php://input'));
  $user_id = (integer)$data->user_id;
  $content = (string)$data->content;
  $parent_id = (integer)$data->parent_id;
  $data = new Post($conn);
  if($auth_id === $user_id){
    $data->createPost($content, $user_id, $parent_id);
    $response = Array(
      "state"=>$auth_id,
      "type"=>'success',
      "permission"=>$permission
    );
  }else{
    $response = Array(
      "state"=>'fail',
      "type"=>'fail'
    );
  }
  
  echo json_encode($response);
}

// update
if($_SERVER['REQUEST_METHOD']=='PATCH'){
  $data = json_decode(file_get_contents('php://input'));
  $content = (string)$data->content;
  $post = new Post($conn, $_GET['post_id']);
  $user_id = (integer)$post->readPost()['user_id'];
  if($auth_id === $user_id){
    $post->updatePost($content);
    $response = Array(
      "state"=>$auth_id,
      "type"=>'success',
      "permission"=>$permission
    );
  }else{
    $response = Array(
      "state"=>'fail',
      "type"=>'fail'
    );
  }
  echo json_encode($response);
}

// delete
if($_SERVER['REQUEST_METHOD']=='DELETE'){
  $data = new Post($conn, $_GET['post_id']);
  $user_id = (integer)$data->readPost()['user_id'];
  if($auth_id === $user_id){
    $data->deletePost();
    $response = Array(
      "state"=>$auth_id,
      "type"=>'success',
      "permission"=>$permission
    );
  }else{
    $response = Array(
      "state"=>'fail',
      "type"=>'fail'
    );
  }
  echo json_encode($response);
}

?>