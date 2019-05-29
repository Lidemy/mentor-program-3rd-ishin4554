<html>
  <head>
    <meta charset="utf-8"/>
    <link rel="stylesheet" href="./css/index.css"/>
  </head>
  <body>
    <?php include './template/navbar.php';?>
    <h1>登入帳號</h1>
    <form class="login__form" method="POST" action="./handle_user_login.php">
      <input name="username" placeholder="帳號">
      <input type="password" name="password" placeholder="密碼">
      <button type="submit">登入</button>
    </form>
  </body>
</html>