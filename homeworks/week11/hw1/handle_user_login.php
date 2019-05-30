<?php
  require_once('conn.php');
  $username = $_POST['username'];
  $password = $_POST['password'];

  if(empty($username) || empty($password)) {
    echo "<script>
      alert('請輸入帳號密碼或註冊會員');
      location = 'login.php';
    </script>";
  } else {
    $sql = "SELECT * FROM ishin4554_users WHERE username = '$username'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $value = rndSession();
    if(!isset($_COOKIE["session"])){
      if(password_verify($password, $row['password'])){
        setcookie("session", $value, time()+60);
        $sql = "SELECT * FROM ishin4554_users_certificate WHERE username = '$username'";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        if (empty($row)) {
          $sql = "INSERT INTO ishin4554_users_certificate(id, username) VALUES('$value','$username')";
        } else {
          $sql = "UPDATE ishin4554_users_certificate SET id = '$value' WHERE username = '$username'";
        }
        $conn->query($sql);
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

  function rndSession() {
    $pattern = "1234567890abcdefghijklmnopqrstuvwxyz";
    $key = "";
    for ($i = 0; $i < 32; $i ++) {
      $key .= $pattern[rand(0,35)];
    }
    echo $key;
    return $key;
  }
?>