<?php
  require_once('conn.php');
  $user_list = $_POST['permission_list'];
  $not_list = $_POST['cancel_list'];
  $sql = "UPDATE ishin4554_users SET permission = 'normal' WHERE NOT permission = 'super admin' AND username NOT IN"."('".implode("','",$not_list)."')";
  $conn->query($sql);
  $sql = "UPDATE ishin4554_users SET permission = 'admin' WHERE username IN"."('".implode("','",$user_list)."')";
  $conn->query($sql);
  header('Location: ./index.php?page=0');
?>