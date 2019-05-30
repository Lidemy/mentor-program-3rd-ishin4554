<?php
  require_once('conn.php');
  $post_id = $_GET['id'];
  $sql = "SELECT content FROM ishin4554_comments WHERE id = '$post_id'";
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $content = $row['content'];
  echo "<form class='input__form' method='POST' action='./handle_update_post.php'>";
    echo "<input type='hidden' value='$post_id' name='id'>";
    echo "<input type='text' class='input__text' name='comment' placeholder='說點什麼' value='$content'/>";
    echo "<button type='submit' class='input__submit'>提交</button>";
  echo "</form>";
?>