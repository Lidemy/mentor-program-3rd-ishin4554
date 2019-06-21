<?php
require_once('source/conn.php');
require_once('source/utils_tasks.php');
require_once('source/utils_users.php');
$dbclass = new DBClass();
$conn = $dbclass->getConnection();
$auth = getallheaders()['Auth'];
$session = new Session($conn);

// GET
if($_SERVER['REQUEST_METHOD']=='GET'){
  if(isset($_GET['user_id'])) {
    http_response_code(200);
    $list = new Task($conn, $_GET['user_id']);
    $result = $list->readTasks();
    $tasks = Array();
    while($row = $result->fetch_assoc()){
      $task = Array(
        "task_id"=>$row['id'],
        "name"=>$row['name'], 
        "date"=>$row['date'], 
        "finish-date"=>$row['finish_date'], 
      );
      array_push($tasks, $task);
    }
    $response = Array(
      "state"=>$session->readSession($auth)['user_id'],
      "content"=>$tasks
    );
    echo json_encode($response);
  } else {
    http_response_code(200);
    $user = new User($conn);
    $users = $user->readAllUser();
    $all_user = Array();
    while($user = $users->fetch_assoc()){
      $list = new Task($conn, $user['id']);
      $result = $list->readTasks();
      $tasks = Array();
      while($row = $result->fetch_assoc()){
        $task = Array(
          "task_id"=>$row['id'], 
          "name"=>$row['name'], 
          "date"=>$row['date'], 
          "finish-date"=>$row['finish_date'], 
        );
        array_push($tasks, $task);
      }
      $user_info = Array(
        'user_id'=>$user['id'],
        'nickname'=>$user['nickname'],
        'intro'=>$user['intro']
      );
      $user_tasks = Array(
        'user'=>$user_info,
        'tasks'=>$tasks
      );
      array_push($all_user, $user_tasks);
    }
    if($row = $session->readSession($auth)){
      $response = Array(
        'state'=>$row['user_id'],
        'content'=>$all_user
      );
    } else {
      $response = Array(
        'state'=>'logout',
        'content'=>$all_user
      );
    }
    echo json_encode($response);
  }
}

// POST
if($_SERVER['REQUEST_METHOD'] == 'POST'){
  $data = json_decode(file_get_contents('php://input'));
  $name = (string)$data->name;
  $date = (string)$data->date;
  $user_id = $data->user_id;
  if($session->readSession($auth)['user_id'] === $user_id){
    $task = new Task($conn, $user_id);

    if(empty($name) || empty($date)) {
      http_response_code(400);
      $response = Array(
        "type"=>"Bad Request",
        "message"=>"Empty Value");
      echo json_encode($response);
    } else {
      $task->createTask($name, $date);
      http_response_code(200);
      $response = Array(
        "type"=>"success",
        "message"=>"add task");
      $list = new Task($conn);
      echo json_encode($response);
    }
  }
}

//PATCH
if($_SERVER['REQUEST_METHOD'] == 'PATCH'){
  $data = json_decode(file_get_contents('php://input'));
  $name = (string)$data->name;
  $date = (string)$data->date;
  $task = new Task($conn, $_GET['user_id']);
  if($session->readSession($auth)['user_id'] === (integer)$_GET['user_id']){
    $result = $task->updateTask($name, $_GET['task_id'], $date);
    http_response_code(200);
    $result = $task->readTasks();
    $tasks = Array();
    while($row = $result->fetch_assoc()){
      $task = Array(
        "name"=>$row['name'], 
        "date"=>$row['date'], 
        "finish-date"=>$row['finish_date'], 
        "task_id"=>$row['id'],
      );
      array_push($tasks, $task);
    }
    $response = Array(
      "state"=>$session->readSession($auth)['user_id'],
      "content"=>$tasks,
    );
    echo json_encode($response);
  }
}

//DELETE
if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
  $data = json_decode(file_get_contents('php://input'));
  $task = new Task($conn, $_GET['user_id']);

  if($session->readSession($auth)['user_id'] === (integer)$_GET['user_id']){
    $task->deleteTask($_GET['task_id']);

    //return list
    http_response_code(200);
    $result = $task->readTasks();
    $tasks = Array();
    while($row = $result->fetch_assoc()){
      $task = Array(
        "name"=>$row['name'], 
        "date"=>$row['date'], 
        "finish-date"=>$row['finish_date'], 
        "task_id"=>$row['id'],
      );
      array_push($tasks, $task);
    }
    $response = Array(
      "state"=>$session->readSession($auth)['user_id'],
      "content"=>$tasks,
    );
    echo json_encode($response);
  }
}

?>