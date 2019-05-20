<nav class="nav">
  <?php 
    echo "<div class='flex--left'>";
      echo "<a href='./index.php' class='nav--item nav__home'>留言板</a>";
    echo "</div>";
    if(isset($_COOKIE["cookie_id"])){
      $is_login = TRUE;
      $cookie = $_COOKIE["cookie_id"];
      $sql = "SELECT * FROM ishin4554_users WHERE cookie_id = $cookie";
      $result = $conn->query($sql);
      $row = $result->fetch_assoc();
      $user_id = $row['id'];
      $username = $row['username'];
      $nickname = $row['nickname'];
      echo "<div class='flex--right'>";
        echo "<p>$nickname</p>";
        echo "<a href='./handle_logout.php' class='nav--item nav__logout'>登出</a>";
      echo "</div>";
    } else {
      $is_login = FALSE;
      echo "<div class='flex--right'>";
        echo "<a href='./login.php' class='nav--item nav__login'>登入</a>";
        echo "<a href='./register.php' class='nav--item nav__register'>註冊</a>";
      echo "</div>";
    }
  ?>
</nav>