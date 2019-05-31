<?php
  require_once('conn.php');
?>
<html>
  <head>
    <title>Challenge: 留言板後台</title>
    <meta charset="utf-8"/>
    <link rel="stylesheet" href="./css/index.css"/>
  </head>
  <body>
    <?php include './template/navbar.php';?>
    <p>本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼</p>
    <?php
      if($permission === 'super admin'){
        $result = $conn->query("SELECT * FROM ishin4554_users ORDER BY register_at DESC");
      if($result->num_rows > 0){
        echo "<table width='300' border='1'>";
        echo "<tr>";
        echo "<th>username</td>";
        echo "<th>nickname</td>";
        echo "<th>admin</td>";
        echo "</tr>";
        while($row=$result->fetch_assoc()){
          if($result->num_rows) {
            $id = $row['id'];
            $username = $row['username'];
            $nickname = $row['nickname'];
            $permission = $row['permission'];
              echo "<tr>";
              echo "<td>$username</td>";
              echo "<td>$nickname</td>";
              if($permission === 'admin') {
                echo "<td><a method='GET' href='./handle_update_permission.php?name=$username&isset=false'>cancel admin</a></td>";
              } else if ($permission === 'super admin'){
                echo "<td>super</td>";
              } else {
                echo "<td><a method='GET' href='./handle_update_permission.php?name=$username&isset=true'>set admin</a></td>";
              }
              echo "</tr>";
          } else {
            break;
          }
        }
        echo "</table>";
      }
      } else {
        header('Location: index.php?page=0');
      }
    ?>
  </body>
</html>