<?php
  require_once('source/utils_post.php');
  $post = new Post($conn);
  $prev = $page-1;
  $next = $page+1;
  echo "<div class='pagination'>";
  if($_SERVER["SCRIPT_NAME"] === '/group1/ishin4554/w12/index.php'){
    $length = $post->getCommentLength(false);
    if ($next * $page_limit >= $length) {
      echo "<a href='./index.php?page=$prev'>prev</a>";
    }
    else if ($prev * $page_limit < 0) {
      echo "<a href='./index.php?page=$next'>next</a>";
    }
    else {
      echo "<a href='./index.php?page=$prev'>prev</a>";
      echo "<a href='./index.php?page=$next'>next</a>";
    }
  } 

  if($_SERVER["SCRIPT_NAME"] === '/group1/ishin4554/w12/backstage.php'){
    $length = $post->getCommentLength(true);
    if ($next * $page_limit >= $length) {
      echo "<a href='./backstage.php?page=$prev'>prev</a>";
    }
    else if ($prev * $page_limit < 0) {
      echo "<a href='./backstage.php?page=$next'>next</a>";
    }
    else {
      echo "<a href='./backstage.php?page=$prev'>prev</a>";
      echo "<a href='./backstage.php?page=$next'>next</a>";
    }
  }
  echo "</div>";
?>