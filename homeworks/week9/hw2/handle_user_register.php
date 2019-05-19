<?php
  require_once('conn.php');
  $username = $_POST['username'];
  $password = $_POST['password'];
  $nickname = $_POST['nickname'];

  if(empty($username) || empty($password)) {
    die('請檢查資料');
  }

  $sql = "INSERT INTO users(username, password, nickname) VALUES('$username','$password','$nickname')";
  if($conn->query($sql)){
    $result = $conn->query($sql);
    header('location: login.php');
  } else {
    echo '註冊失敗';
  }
?>