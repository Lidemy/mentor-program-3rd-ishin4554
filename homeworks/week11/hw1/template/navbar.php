<nav class="nav">
  <?php 
    echo "<div class='flex--left'>";
      echo "<a href='./index.php?page=0' class='nav--item nav__home'>留言板</a>";
    echo "</div>";
    if(isset($_COOKIE["session"])){
      $is_login = TRUE;
      $session = $_COOKIE["session"];
      $sql = "SELECT * FROM ishin4554_users_certificate WHERE id = '$session'";
      $result = $conn->query($sql);
      $row = $result->fetch_assoc();
      $username = $row['username'];
      $sql = "SELECT * FROM ishin4554_users WHERE username = '$username'";
      $result = $conn->query($sql);
      $row = $result->fetch_assoc();
      $permission = $row['permission'];
      $user_id = $row['id'];
      $nickname = $row['nickname'];
      echo "<div class='flex--right'>";
        echo "<p>$nickname</p>";
        if ($permission === "admin") {
          echo "<a href='./backstage.php?page=0' class='nav--item nav__logout'>後台</a>";
        }
        if ($permission === "super admin") {
          echo "<a href='./backstage.php?page=0' class='nav--item nav__logout'>後台</a>";
          echo "<a href='./permission.php?page=0' class='nav--item nav__logout'>權限管理</a>";
        }
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