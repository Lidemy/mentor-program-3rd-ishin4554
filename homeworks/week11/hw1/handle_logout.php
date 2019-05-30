<?php
  setcookie('session', '', time()-3600);
  header("location: index.php?page=0");
?>