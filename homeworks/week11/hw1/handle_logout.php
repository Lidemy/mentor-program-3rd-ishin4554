<?php
  setcookie('sessionID', '', time()-3600);
  header("location: index.php?page=0");
?>