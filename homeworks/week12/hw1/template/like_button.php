<?php
  if (!isset($user_id)) {
    $user_id = NULL;
  }
  $like = new Like($conn, $post_id, $user_id);
  $num = $like->getAllLike();
  if($is_like = $like->getLike()){
    echo "<div class='dash__like bg--like' data-post='$post_id'>Like <span class='like__count'>$num</span></div>";
  } else {
    echo "<div class='dash__like' data-post='$post_id'>Like <span class='like__count'>$num</span></div>";
  }
?>