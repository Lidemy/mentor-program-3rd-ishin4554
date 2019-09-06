<?php
class Posts_model extends CI_Model {
  public function __construct()
  {
    $this->load->database();
  }

  public function get_posts($id = FALSE)
  {
    if ($id === FALSE)
    {
      $query = $this->db->get('post');
      return $query->result_array();
    }

    $query = $this->db->get_where('post', array('id' => $id));
    return $query->row_array();
  }

  public function set_posts()
  {
    $data = array(
        'content' => $this->input->post('content')
    );

    return $this->db->insert('post', $data);
  }

  public function delete_posts($id)
  {
    $this->db->delete('post', array('id' => $id));
  }

  public function update_posts($id)
  {
    $data = array(
        'content' => $this->input->post('content')
    );

    $this->db->update('post', $data, array('id' => $id));
  }
}