<?php
require_once('source/conn.php');
require_once('source/utils_user.php');

$data = json_decode(file_get_contents('php://input'));
$dbclass = new DBClass();
$conn = $dbclass->getConnection();
if($_SERVER['REQUEST_METHOD']=='POST' && !isset($data->nickname)){
  $username = (string)$data->username;
  $password = (string)$data->password;
  $user = new User($conn);
  if(empty($username) || empty($password)) {
    http_response_code(400);
    $response = Array(
      "type"=>"Bad Request",
      "message"=>"Empty Value");
    echo json_encode($response);
  } else {
    if (!$user->readUserByName($username)){
      http_response_code(402);
      $response = Array(
        "type"=>"Unauthorized",
        "message"=>"The username is not exists");
      echo json_encode($response);
    } else {
      $row = $user->readUserByName($username);
      if(password_verify($password, $row['password'])){
        $session = new Session($conn, $row['id']);
        $sessionID = $session->setSession();
        http_response_code(200);
        $response = Array(
          "type"=>"success",
          "message"=>"Success login",
          "session"=>$sessionID
        );
        echo json_encode($response);
      } else {
        http_response_code(402);
        $response = Array(
          "type"=>"Unauthorized",
          "message"=>"Wrong password");
        echo json_encode($response);
      }
    }
  }
}

// Register
if($_SERVER['REQUEST_METHOD']=='POST' && isset($data->nickname)){
  $username = (string)$data->username;
  $password = (string)password_hash($data->password, PASSWORD_BCRYPT);
  $nickname = (string)$data->nickname;
  $user = new User($conn, $username);

  if(empty($username) || empty($password) || empty($nickname)) {
    http_response_code(400);
    $response = Array(
      "type"=>"Bad Request",
      "message"=>"Empty Value");
    echo json_encode($response);
  } else {
    if ($user->readUserByName($username)){
      http_response_code(409);
      $response = Array(
        "type"=>"Conflict",
        "message"=>"The username already exists");
      echo json_encode($response);
    } else {
      $user->createUser($username, $password, $nickname);
      http_response_code(200);
      $response = Array(
        "type"=>"success",
        "message"=>"Success add user");
      echo json_encode($response);
    }
  }
  }

  if($_SERVER['REQUEST_METHOD']=='GET' && !isset($_GET['user_id'])){
    $session = new Session($conn);
    $auth = getallheaders()['Auth'];
    $auth_id = (integer)$session->readSession($auth)['user_id'];
    $data = new User($conn, $auth_id);
    $permission = $data->readUserById()['permission'];
    if($permission === 'super admin'){
      $result = $data->readUsers();
      $all_user = Array();
      while($row = $result->fetch_assoc()){
        $info = Array(
          "user_id"=>htmlspecialchars($row['id'], ENT_QUOTES, 'UTF-8'),
          "nickname"=>htmlspecialchars($row['nickname'], ENT_QUOTES, 'UTF-8'),
          "permission"=>htmlspecialchars($row['permission'], ENT_QUOTES, 'UTF-8'),
        );
        array_push($all_user, $info);
      }
      $response = Array(
        "type"=>"success",
        "users"=>$all_user
      );
    }else{
      $response = Array(
        "type"=>"fail",
      );
    }
    echo json_encode($response);
  }

  if($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['user_id'])){
    $session = new Session($conn);
    $auth = getallheaders()['Auth'];
    $auth_id = (integer)$session->readSession($auth)['user_id'];
    $data = new User($conn, $auth_id);
    $permission = $data->readUserById()['permission'];
    $user_id = $_GET['user_id'];
    if($permission === 'super admin'){
      $update_user = new User($conn, $user_id);
      $update_user->updateUserPermission();
      $response = Array(
        "type"=>"success",
      );
    }else{
      $response = Array(
        "type"=>"fail",
      );
    }
    echo json_encode($response);
  }
?>
