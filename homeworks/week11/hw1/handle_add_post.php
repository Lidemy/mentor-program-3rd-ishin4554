<?php
  require_once('conn.php');
  $comment = $_POST['comment'];
  $user_id = $_POST['user_id'];
  if(empty($comment)) {
    echo "<script>
          alert('請輸入內容');
          location = 'index.php?page=0';
        </script>";
  } else {
    $sql = "INSERT INTO ishin4554_comments (user_id, content) VALUES ('$user_id','$comment')";
    $result = $conn->query($sql);
    header('location: index.php?page=0');
  }
?>
