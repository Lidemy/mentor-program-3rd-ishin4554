<div class="container">
  <h2><?php echo $title ?></h2>
  <a href='/index.php/posts/create'> create </a>
  <ul class="list-group list-group-flush">
  <?php foreach ($posts as $posts_item): ?>
    <li class="list-group-item">
      <h3><?php echo $posts_item['id'] ?></h3>
      <div class="main">
        <span>
          <?php echo $posts_item['content'] ?>
        </span>
        <a href="/index.php/posts/delete/<?php echo $posts_item['id'] ?>" class="badge badge-danger">Delete</a>
        <a href="/index.php/posts/update/<?php echo $posts_item['id'] ?>" class="badge badge-warning">Edit</a>
      </div>
    </li>
  <?php endforeach ?>
  </ul>
</div>
