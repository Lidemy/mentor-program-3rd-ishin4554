<?php
  require_once('conn.php');
  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
  $nickname = $_POST['nickname'];

  if(empty($username) || empty($password) || empty($nickname)) {
    echo "<script>
          alert('請輸入內容');
          location = 'register.php';
        </script>";
  } else {
    if (empty($conn->query("SELECT * FROM ishin4554_users WHERE username = '$username'"))){
      echo "<script>
        alert('此帳號已有人使用');
        location = 'register.php';
      </script>";
    } else {
      $sql = "INSERT INTO ishin4554_users(username, password, nickname) VALUES('$username','$password','$nickname')";
      $result = $conn->query($sql);
      header('location: login.php');
    }
  }
?>