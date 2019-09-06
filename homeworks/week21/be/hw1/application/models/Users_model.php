<?php
class Users_model extends CI_Model {
  public function __construct()
  {
    $this->load->database();
  }

  public function check_users() {
    $account = $this->input->post('account');
    $query = $this->db->get_where('user', array('account' => $account));
    $password = $query->row_array()['password'];
    if(password_verify($this->input->post('password'), $password)){
      $this->session->set_userdata('user_id', $query->row_array()['id']);
      return true;
    } else {
      return false;
    }
  }

  public function set_users()
  {
    $query = $this->db->get_where('user', array('account' => $this->input->post('account')));
    if(!$query->row_array()){
      $data = array(
        'account' => $this->input->post('account'),
        'password' => password_hash($this->input->post('password'), PASSWORD_BCRYPT),
        'nickname' => $this->input->post('nickname')
      );
      return $this->db->insert('user', $data);
    } else {
      echo false;
    }
  }
}