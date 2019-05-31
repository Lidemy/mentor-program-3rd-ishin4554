<?php
  require_once('source/utils_post.php');
  $post = new Post($conn);
  $length = $post->getCommentLength();
  $prev = $page-1;
  $next = $page+1;
  echo "<div class='pagination'>";
    if ($next * $page_limit >= $length['COUNT(*)']) {
      echo "<a href='./index.php?page=$prev'>prev</a>";
    }
    else if ($prev * $page_limit < 0) {
      echo "<a href='./index.php?page=$next'>next</a>";
    }
    else {
      echo "<a href='./index.php?page=$prev'>prev</a>";
      echo "<a href='./index.php?page=$next'>next</a>";
    }
  echo "</div>";
?>