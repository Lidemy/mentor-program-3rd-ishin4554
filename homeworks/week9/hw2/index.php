<?php
  require_once('conn.php');
?>
<html>
  <head>
    <title></title>
    <meta charset="utf-8"/>
    <link rel="stylesheet" href="./css/index.css"/>
  </head>
  <body>
    <nav class="nav">
      <?php 
        if(isset($_COOKIE["cookie_id"])){
          $cookie = $_COOKIE["cookie_id"];
          $sql = "SELECT * FROM users WHERE cookie_id = $cookie";
          $result = $conn->query($sql);
          $row = $result->fetch_assoc();
          $user_id = $row['id'];
        } else {
          echo "<a href='./login.php' class='nav--item nav__login'>登入</a>";
          echo "<a href='./register.php' class='nav--item nav__register'>註冊</a>";
        }
      ?>
    </nav>
    <h1 class="title">留言板</h1>
    <div class="input">
      <form class="input__form" method="POST" action="./handle_add_post.php">
        <?php
          if(isset($_COOKIE["cookie_id"])){
            echo "<input type='hidden' value='$user_id' name='user_id'>";
          }
        ?>
        <textarea cols="50" rows="2" class="input__text" name="comment">說點什麼......</textarea>
        <button type="submit" class="input__submit">提交</button>
      </form>
    </div>
    <div class="board">
      <?php
        $sql = "SELECT * FROM comments ORDER BY time DESC";
        $result = $conn->query($sql);
        if($result->num_rows > 0){
          while($row=$result->fetch_assoc()){
            $comment = $row['content'];
            $time = $row['time'];
            $user_id = $row['user_id'];
            $user_sql = "SELECT * FROM users WHERE id=$user_id";
            $user_result = $conn->query($user_sql);
            $user_row = $user_result->fetch_assoc();
            $nickname = $user_row['nickname'];
            echo "<div class='board__comment'>";
            echo "<div class='comment__header'>";
            echo "<div class='header__nickname'>$nickname</div>";
            echo "<div class='header__timestamp'>$time</div>";
            echo "</div>";
            echo "<div class='comment__content'>$comment</div>";
          }
        } 
      ?>
      </div>
    </div>
  </body>
</html>