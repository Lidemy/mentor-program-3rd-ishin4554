<div class="board">
  <?php
    $page_limit= 8;
    if (isset($_GET['page'])) {
      $page = $_GET['page'];
    } else {
      $page = 0;
    }
    $start = $page*$page_limit;
    if($_SERVER["SCRIPT_NAME"] === '/group1/ishin4554/w12/index.php'){
      $result = $conn->query("SELECT * FROM ishin4554_comments 
      WHERE parent_id=0 
      AND is_delete IS NULL ORDER 
      BY time DESC LIMIT $start, $page_limit");
    } 
    if ($_SERVER["SCRIPT_NAME"] === '/group1/ishin4554/w12/backstage.php') {
      $result = $conn->query("SELECT * FROM ishin4554_comments 
      WHERE is_delete IS NULL 
      ORDER BY time DESC LIMIT $start, $page_limit");
    }
    if($result->num_rows > 0){
      while($row=$result->fetch_assoc()){
        $post_id = $row['id'];
        $comment = $row['content'];
        $time = $row['time'];
        $post_user = new User($conn);
        $post_user_id = $row['user_id'];
        $post_nickname = $post_user->readUserById($post_user_id)['nickname'];
        include './template/comment.php';
      }
    }
    ?>
</div>