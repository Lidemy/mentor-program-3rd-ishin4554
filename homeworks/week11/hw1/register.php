<html>
  <head>
    <meta charset="utf-8"/>
    <link rel="stylesheet" href="./css/index.css"/>
  </head>
  <body>
    <?php include './template/navbar.php';?>
    <h1>註冊帳號</h1>
    <form class="register__form" method="POST" action="./handle_user_register.php">
      <input name="nickname" placeholder="暱稱"/>
      <input name="username" placeholder="帳號"/>
      <input type="password" name="password" placeholder="密碼"/>
      <button type="submit">註冊</button>
    </form>
  </body>
</html>