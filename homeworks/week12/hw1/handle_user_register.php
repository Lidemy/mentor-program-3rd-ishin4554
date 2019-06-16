<?php
  require_once('conn.php');
  require_once('source/utils_user.php');
  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
  $nickname = $_POST['nickname'];
  $user = new User($conn, $username);
  if(empty($username) || empty($password) || empty($nickname)) {
    echo "<script>
          alert('請輸入內容');
          location = 'register.php';
        </script>";
  } else {
    if ($user->checkUser()){
      echo "<script>
        alert('此帳號已有人使用');
        location = 'register.php';
      </script>";
    } else {
      $user->createUser($password, $nickname);
      // header('location: login.php');
    }
  }
?>