<?php
  require_once('conn.php');
?>
<html>
  <head>
    <title>Challenge: 留言板後台</title>
    <meta charset="utf-8"/>
    <link rel="stylesheet" href="./css/index.css"/>
  </head>
  <body>
    <?php include './template/navbar.php';?>
    <p>本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼</p>
    <?php
      $result = $conn->query("SELECT * FROM ishin4554_users ORDER BY register_at DESC");
      if($result->num_rows > 0){
        echo "<form method='post' action='handle_update_permission.php'>";
        echo "<div class='user__header'>";
          echo "<div class='header__username'>admin</div>";
          echo "<div class='header__username'>username</div>";
          echo "<div class='header__nickname'>nickname</div>";
        echo "</div>";
        while($row=$result->fetch_assoc()){
          if($result->num_rows) {
            $username = $row['username'];
            $nickname = $row['nickname'];
            $permission = $row['permission'];
              echo "<div class='user__header'>";
              if($permission === 'admin') {
                echo "<input type='checkbox' name='cancel_list[]' value='$username' checked>";
              } else if ($permission === 'super admin'){
                echo "<em>s</em>";
              } else {
                echo "<input type='checkbox' name='permission_list[]' value='$username'>";
              }
              echo "<div class='header__username'>$username</div>";
              echo "<div class='header__nickname'>$nickname</div>";
              echo "</div>";
          } else {
            break;
          }
        }
        echo "<button type='submit'>送出管理</button>";
        echo "</form>";
      }
    ?>
  </body>
</html>