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
    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $value = mt_rand(1000000, 9999999);
    if(!isset($_COOKIE["cookie_id"])){
      if($row['password']===$password){
        setcookie("cookie_id", $value, time()+60);
        $sql = "UPDATE users SET cookie_id = '$value' WHERE username = '$username'";
        $conn->query($sql);
        header('location: index.php');
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