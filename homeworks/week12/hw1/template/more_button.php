<?php
  $check_list = new Post($conn, $post_id);
  if(!empty($check_list->getLevelComments())){
    echo "<div class='dash__more' data-post='$post_id'>More</div>";
  }
?>