<?php
require_once('source/conn.php');
require_once('source/utils_users.php');

$data = json_decode(file_get_contents('php://input'));
$dbclass = new DBClass();
$conn = $dbclass->getConnection();
$username = (string)$data->username;
$password = (string)password_hash($data->password, PASSWORD_BCRYPT);
$nickname = (string)$data->nickname;
$user = new User($conn);

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
?>