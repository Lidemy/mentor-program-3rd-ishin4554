<?php
  require '/vendor/autoload.php';


  //POST / CREATE 
  if($_SERVER['REQUEST_METHOD']=='POST'){
    $data = json_decode(file_get_contents('php://input'));
    $name = (string)$data->name;
    $author = (string)$data->author;
    $url = (string)$data->url;
    $links = (array)$data->links;
    $is_done = (boolean)$data->is_done;

    $collection = (new MongoDB\Client("mongodb://172.17.0.2:27017"))->test->task;

    // write test
    $insertTest = $collection->insertOne([
      'name'=>$name,
      'author'=>$author,
      'url'=>$url,
      'links'=>$links,
      'is_done'=>$is_done
    ]);
  }

  //GET / READ 
  if($_SERVER['REQUEST_METHOD']=='GET'){
    $collection = (new MongoDB\Client("mongodb://172.17.0.2:27017"))->test->task;
    $cursor = $collection->find([]);
    $response = Array();
    foreach ($cursor as $document) {
      $data = Array(
        'id'=>$document['_id'],
        'name'=>$document['name'],
        'url'=>$document['url'],
        'author'=>$document['author'],
        'links'=>$document['links'],
        'is_done'=>$document['is_done']
      );
      array_push($response, $data);
    }
    echo json_encode($response);
  }

  //PATCH
  if($_SERVER['REQUEST_METHOD']=='PATCH'){
    $collection = (new MongoDB\Client("mongodb://172.17.0.2:27017"))->test->task;
    $data = json_decode(file_get_contents('php://input'));
    $is_done = (boolean)$data->is_done;
    $name = (string)$data->name;
    $collection->updateOne(
      ['name'=>$name],
      ['$set'=> ['is_done'=>$is_done]]
    );
  }

?>