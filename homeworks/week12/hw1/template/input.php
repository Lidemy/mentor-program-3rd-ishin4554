<html>
  <head>
    <link rel="stylesheet" href="./css/index.css"/>
  </head>
  <body>
    <?php
      switch($_SERVER["SCRIPT_NAME"]) {
        case "/group1/ishin4554/w12/index.php": 
          echo "<form class='input__form' method='POST' action='./handle_add_post.php'>";
            echo "<input type='hidden' value='$user_id' name='user_id'>";
            echo "<input type='text' class='input__text' name='comment' placeholder='說點什麼'/>";
            echo "<button type='submit' class='input__submit'>提交</button>";
          echo "</form>";
          break;
        case "/group1/ishin4554/w12/update_post.php":
          echo "<form class='input__form' method='POST' action='./handle_update_post.php'>";
            echo "<input type='hidden' value='$post_id' name='id'>";
            echo "<input type='text' class='input__text' name='comment' placeholder='說點什麼' value='$content'/>";
            echo "<button type='submit' class='input__submit'>提交</button>";
          echo "</form>";
          break;
        default: 
          echo $_SERVER["SCRIPT_NAME"];
          break;
      }
    ?>
  </body>
</html>