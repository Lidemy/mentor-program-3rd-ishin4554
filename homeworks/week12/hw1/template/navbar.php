<nav class="nav">
  <?php 
    require_once('conn.php');
    require_once('source/utils_user.php');
    echo "<div class='flex--left'>";
      echo "<a href='./index.php?page=0' class='nav--item nav__home'>留言板</a>";
    echo "</div>";
    if(isset($_COOKIE["sessionID"])){
      $is_login = TRUE;
      $sessionID = $_COOKIE["sessionID"];
      $session = new Session($conn,NULL,$sessionID);
      $username = $session->readSession();
      $user = new User($conn, $username);
      $info = $user->readUserByName();
      $permission = $info['permission'];
      $user_id = $info['id'];
      $nickname = $info['nickname'];
      echo "<div class='flex--right'>";
        echo "<p>$nickname</p>";
        if ($permission === "admin") {
          echo "<a href='./backstage.php?page=0' class='nav--item nav__backstage'>後台</a>";
        }
        if ($permission === "super admin") {
          echo "<a href='./backstage.php?page=0' class='nav--item nav__backstage'>後台</a>";
          echo "<a href='./permission.php?page=0' class='nav--item nav__permission'>權限管理</a>";
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