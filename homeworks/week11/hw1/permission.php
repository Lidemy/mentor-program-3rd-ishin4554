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
    <div class="board">
      <?php
        $result = $conn->query("SELECT * FROM ishin4554_users ORDER BY register_at DESC");
        if($result->num_rows > 0){
          echo "<form method='post' action='handle_update_permission.php'>";
          while($row=$result->fetch_assoc()){
            if($result->num_rows) {
              $username = $row['username'];
              $nickname = $row['nickname'];
              $permission = $row['permission'];
              echo "<div class='board__comment'>";
                echo "<div class='comment__header'>";
                if($permission === 'admin') {
                  echo "<input type='checkbox' name='cancel_list[]' value='$username' checked>";
                } else if ($permission === 'super admin'){
                  echo "<p> super admin </p>";
                } else {
                  echo "<input type='checkbox' name='permission_list[]' value='$username'>";
                }
                  echo "<div class='header__nickname'>$username</div>";
                  echo "<div class='header__timestamp'>$nickname</div>";
                echo "</div>";
              echo "</div>";
            } else {
              break;
            }
          }
          echo "<button type='submit'></button>";
          echo "</form>";
        } 
      ?>
      </div>
    </div>
  </body>
</html>