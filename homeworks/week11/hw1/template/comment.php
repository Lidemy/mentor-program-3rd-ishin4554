<?php
  echo "<div class='board__comment'>";
  echo "<div class='comment__header'>";
    echo "<div class='header__nickname'>$post_nickname</div>";
    echo "<div class='header__timestamp'>$time</div>";
  echo "</div>";
  echo "<div class='comment__content'>$comment</div>";
    if($_SERVER["SCRIPT_NAME"] === '/ishin4554/w11//index.php' && $is_login && $post_user_id === $user_id){
      echo "<a method='GET' href='./handle_delete_post.php?id=$post_id'>delete</a>";
      echo "<a method='GET' href='./update_post.php?id=$post_id'>edit</a>";
    } else if ($_SERVER["SCRIPT_NAME"] === '/ishin4554/w11/backstage.php' && $permission !== 'noraml') {
      echo "<a method='GET' href='./handle_delete_post.php?id=$post_id'>delete</a>";
      echo "<a method='GET' href='./update_post.php?id=$post_id'>edit</a>";
    }
  echo "</div>";
?>