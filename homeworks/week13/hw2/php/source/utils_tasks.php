
<?php
  class Task {
    private $table = 'ishin4554_todo_tasks';
    protected $conn;
    protected $user_id;
    public function __construct($connection, $id = 0){
      $this->conn = $connection;
      $this->user_id = $id;
    }

    public function readTasks(){
      $sql = "SELECT * FROM $this->table WHERE user_id=? AND is_delete IS NULL";
      $result = $this->conn->prepare($sql);
      $result->bind_param('s', $this->user_id);
      $result->execute();
      $data = $result->get_result();
      if (empty($data)){
        return false;
      } else {
        return $data;
      }    
    }
    public function createTask($name, $date){
      $sql =  "INSERT INTO 
      $this->table(name, date, user_id) VALUES(?,?,?)";
      $result = $this->conn->prepare($sql);
      $result->bind_param('ssi', $name, $date, $this->user_id);
      $result->execute();
    }
    public function updateTask($name, $task_id, $date=null){
      $sql = "UPDATE $this->table SET name=?, date=? WHERE id=?";
      $result = $this->conn->prepare($sql);
      $result->bind_param('ssi', $name, $date, $task_id);
      $result->execute();
      $sql = "SELECT * FROM $this->table WHERE id=?";
      $result = $this->conn->prepare($sql);
      $result->bind_param('i', $task_id);
      if ($result->execute()) {
        $data = $result->get_result();
        return $data;
      } else {
        echo $this->conn->$error;
      }
    }
    public function deleteTask($task_id){
      $sql = "UPDATE $this->table SET is_delete=true WHERE id=?";
      $result = $this->conn->prepare($sql);
      $result->bind_param('i', $task_id);
      if ($result->execute()) {
      } else {
        echo $this->conn->$error;
      }
    }
  }
?>