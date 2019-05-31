<?php
  require_once('conn.php');
  require_once('source/utils_post.php');
  require_once('source/utils_user.php');
?>
<html>
  <head>
    <title>HW4: 留言板</title>
    <meta charset="utf-8"/>
    <link rel="stylesheet" href="./css/index.css"/>
  </head>
  <body>
    <?php include './template/navbar.php';?>
    <p>本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼</p>
    <?php if($is_login){
      include './template/input.php';
    }
    ?>
    <?php include 'template/board.php';?>
    <?php 
      include 'template/pagination.php';
    ?>
  </body>
</html>