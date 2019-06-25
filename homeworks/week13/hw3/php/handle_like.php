<?php
require_once('./source/conn.php');
require_once('./source/utils_post.php');
require_once('./source/utils_user.php');

$data = json_decode(file_get_contents('php://input'));
$dbclass = new DBClass();
$conn = $dbclass->getConnection();

// data
$data = json_decode(file_get_contents('php://input'));
$auth = getallheaders()['Auth'];
$session = new Session($conn);
if(!empty($session->readSession($auth)['user_id'])){
  $auth_id = (integer)$session->readSession($auth)['user_id'];
  $permission = $session->readSession($auth);
}else{
  $auth_id = 'logout';
}

if($_SERVER['REQUEST_METHOD']=='PATCH'){
  $data = json_decode(file_get_contents('php://input'));
  $user_id = (integer)$data->user_id;
  $post_id = (integer)$_GET['post_id'];
  $data = new Like($conn, $post_id, $user_id);
  if($auth_id == $user_id){
    $data->toggleLike();
    $response = Array(
      "state"=>$auth_id,
      "type"=>'success',
      "likes"=>$data->readLike()
    );
  } else {
    $response = Array(
      "state"=>'fail',
      "type"=>'fail'
    );
  }
  echo json_encode($response);
}

?>