<?php
  require_once('conn.php');
  require_once('source/utils_user.php');
  $username = $_POST['username'];
  $password = $_POST['password'];
  $user = new User($conn, $username);
  if(empty($username) || empty($password)) {
    echo "<script>
      alert('請輸入帳號密碼或註冊會員');
      location = 'login.php';
    </script>";
  } else {
    $row = $user->readUserByName();
    if(!isset($_COOKIE["sessionID"])){
      if(password_verify($password, $row['password'])){
        $session = new Session($conn, $username);
        setcookie("sessionID", $session->setSession(), time()+300);
        header('location: index.php?page=0');
      } else {
        echo "<script>
          alert('請輸入正確帳號密碼或註冊會員');
          location = 'login.php';
        </script>";
      }
    } else {
      echo "no cookie in login page error";
    }
  }
?>