<?php
require_once 'source/utils_post.php';
  echo "<div class='board__comment'>";
  echo "<div class='comment__header'>";
    echo "<div class='header__nickname'>$post_nickname</div>";
    echo "<div class='header__timestamp'>$time</div>";
  echo "</div>";
  echo "<div class='comment__content'>";
    echo htmlspecialchars($comment, ENT_QUOTES, 'utf-8');
    include_once 'like_button.php';
    echo "<div class='dash__more' data-post='$post_id'>More</div>";
    echo "</div>";
  echo "</div>";
    if($_SERVER["SCRIPT_NAME"] === '/group1/ishin4554/w12/index.php'){
      if ($is_login) {
        if ($post_user_id == $user_id){
          echo "<a method='GET' href='./handle_delete_post.php?id=$post_id'>delete</a>";
          echo "<a method='GET' href='./update_post.php?id=$post_id'>edit</a>";
        }
      }
    } else if ($_SERVER["SCRIPT_NAME"] === '/group1/ishin4554/w12/backstage.php' && $permission !== 'noraml') {
      echo "<a method='GET' href='./handle_delete_post.php?id=$post_id'>delete</a>";
      echo "<a method='GET' href='./update_post.php?id=$post_id'>edit</a>";
    }
  echo "</div>";
?>