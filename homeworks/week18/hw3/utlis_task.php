<?php
  class Task {
    private $manager;
    private $bulk;
    private $id;
    private $collection;
    public function __construct($_manager, $_id = "5d61dd25ef0fdf0b41154795"){
      $this->manager = $_manager;
      $this->bulk = new MongoDB\Driver\BulkWrite;
      $this->id = new MongoDB\BSON\ObjectID($_id);
      $this->collection = 'test.task';
    } 

    public function readTask(){
      $filter = [];
      $read = new MongoDB\Driver\Query($filter);
      $tasks = $this->manager->executeQuery($this->collection, $read)->toArray();
      return $tasks;
    }
    public function insertTask($document){
      $this->bulk->insert($document); 
      $this->manager->executeBulkWrite($this->collection, $this->bulk);
    }
    public function deleteTask(){
      $filter = ['_id' => new MongoDB\BSON\ObjectID($this->id)];
      $this->bulk->delete($filter);
      $this->manager->executeBulkWrite($this->collection, $this->bulk);
    }
    public function updateTask($document){
      $filter = ['_id' => new MongoDB\BSON\ObjectID($this->id)];
      $this->bulk->update($filter, ['$set'=>$document]);
      $this->manager->executeBulkWrite($this->collection, $this->bulk);
    }
    public function toggleRead(){
      $filter = ['_id' => new MongoDB\BSON\ObjectID($this->id)];
      $query = new MongoDB\Driver\Query($filter);
      $value = $this->manager->executeQuery($this->collection, $query)->toArray();
      $this->bulk->update($filter, 
        ['$set'=>['is_achieved'=> !$value[0]->is_achieved]]);
      $this->manager->executeBulkWrite($this->collection, $this->bulk);
    }
  }
?>