<?php
require_once('source/conn.php');
require_once('source/utils_users.php');

$data = json_decode(file_get_contents('php://input'));
$dbclass = new DBClass();
$conn = $dbclass->getConnection();
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
?>