<?php
  ini_set('display_errors', 1);

  $manager = new mongodb\driver\manager("mongodb://localhost:27017");
  // insert 
  if($_SERVER['REQUEST_METHOD']=='POST') {
    $data = json_decode(file_get_contents('php://input'));
    $bulk = new MongoDB\Driver\BulkWrite;
    $document = [
    '_id' => new MongoDB\BSON\ObjectID, 
    'title' => $data->title, 
    'url' => $data->url,
    'tags' => $data->tags,
    'is_achieved' => false];
    $bulk->insert($document);
    $manager->executeBulkWrite('test.task', $bulk);
  }

  // read 
  if($_SERVER['REQUEST_METHOD']=='GET') {
    if(isset($_GET['id'])){
      $filter = ['_id' => new MongoDB\BSON\ObjectID($_GET['id'])];
      $bulk = new MongoDB\Driver\BulkWrite;
      $query = new MongoDB\Driver\Query($filter);
      $value = $manager->executeQuery("test.task", $query)->toArray();
      $bulk->update($filter, 
        ['$set'=>['is_achieved'=> !$value[0]->is_achieved]]);
      $manager->executeBulkWrite('test.task', $bulk);
    } 
    $filter = [];
    $read = new MongoDB\Driver\Query($filter);
    $tasks = $manager->executeQuery("test.task", $read)->toArray();
    $response = Array(
      "state"=>'success',
      "tasks"=>$tasks
    );
    echo json_encode($response);
  }

  if($_SERVER['REQUEST_METHOD']=='PATCH'){
    $data = json_decode(file_get_contents('php://input'));
    $filter = ['_id' => new MongoDB\BSON\ObjectID($_GET['id'])];
    $document = [
      'title'=>$data->title,
      'url'=>$data->url 
    ];
    $bulk = new MongoDB\Driver\BulkWrite();
    $bulk->update($filter, ['$set'=>$document]);
    $manager->executeBulkWrite('test.task', $bulk);
  }

  if($_SERVER['REQUEST_METHOD']=='DELETE'){
    $filter = ['_id' => new MongoDB\BSON\ObjectID($_GET['id'])];
    $bulk = new MongoDB\Driver\BulkWrite();
    $bulk->delete($filter);
    $manager->executeBulkWrite('test.task', $bulk);
  }

?>