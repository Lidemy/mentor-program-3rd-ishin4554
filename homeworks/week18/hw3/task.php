<?php
  ini_set('display_errors', 1);
  require_once('utlis_task.php');
  require_once('conn.php');
  
  // insert 
  if($_SERVER['REQUEST_METHOD']=='POST') {
    $data = json_decode(file_get_contents('php://input'));
    $task = new Task($manager);
    $document = [
    '_id' => new MongoDB\BSON\ObjectID, 
    'title' => $data->title, 
    'url' => $data->url,
    'tags' => $data->tags,
    'is_achieved' => false];
    $task->insertTask($document);
  }

  // read 
  if($_SERVER['REQUEST_METHOD']=='GET') {
    if(isset($_GET['id'])){
      $task = new Task($manager, $_GET['id']);
      $tasks = $task->toggleRead();
    } 
    $task = new Task($manager);
    $tasks = $task->readTask();
    $response = Array(
      "state"=>'success',
      "tasks"=>$tasks
    );
    echo json_encode($response);
  }

  if($_SERVER['REQUEST_METHOD']=='PATCH'){
    $data = json_decode(file_get_contents('php://input'));
    $document = [
      'title'=>$data->title,
      'url'=>$data->url 
    ];
    $task = new Task($manager, $_GET['id']);
    $task->updateTask($document);
  }

  if($_SERVER['REQUEST_METHOD']=='DELETE'){
    $task = new Task($manager, $_GET['id']);
    $task->deleteTask();
  }

?>