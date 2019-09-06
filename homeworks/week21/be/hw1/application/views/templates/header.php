<html>
  <head>
    <title>CI 留言板</title>
    <meta charset='utf-8' />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  </head>
  <style>
    h2 {
      text-align: center;
      margin: 20px;
    }
    form {
      border: solid 1px #efefef;
      padding: 20px;
    }
  </style>
  <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link" href="/index.php/posts/">Home</a>
          <?php if(!$this->session->userdata('user_id')){ ?>
            <a class="nav-item nav-link" href="/index.php/users/create/">register</a>
            <a class="nav-item nav-link" href="/index.php/users/login/">login</a>
          <?php } else { ?>
            <a class="nav-item nav-link" href="/index.php/users/logout/">logout</a>
          <?php } ?>
        </div>
      </div>
    </nav>      

