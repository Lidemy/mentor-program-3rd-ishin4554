<?php
  require_once('conn.php');
  $username = $_GET['name'];
  if($_GET['isset']==='true'){
    $sql = "UPDATE ishin4554_users SET permission = 'admin' WHERE username = '$username'";
  } else if($_GET['isset']==='false') {
    $sql = "UPDATE ishin4554_users SET permission = 'normal' WHERE username = '$username'";
  }
  $conn->query($sql);
  header('Location: permission.php');
?>