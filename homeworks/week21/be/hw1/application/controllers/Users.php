<?php
class Users extends CI_Controller {
  public function __construct()
  {
    parent::__construct();
    $this->load->model('users_model');
    $this->load->helper('form');
    $this->load->library('form_validation');
    $this->load->library('session');
    $this->load->helper('url');
  }

  public function logout() {
    $this->session->unset_userdata('user_id');
    $this->load->helper('url');
    redirect('/posts', 'refresh');
  }

  public function login() {

    $data['title'] = '登入';

    $this->form_validation->set_rules('account', 'account', 'required');
    $this->form_validation->set_rules('password', 'password', 'required');

    if ($this->form_validation->run() === FALSE)
    {
      $this->load->view('templates/header', $data);
      $this->load->view('users/login');
      $this->load->view('templates/footer');
    }
    else
    {
      if($this->users_model->check_users()){
        redirect('/posts', 'refresh');
      } else {
        redirect('/users/login', 'refresh');
      } 
    }
  }

  public function create() {

    $data['title'] = '註冊新帳號';

    $this->form_validation->set_rules('account', 'account', 'required');
    $this->form_validation->set_rules('password', 'password', 'required');

    if ($this->form_validation->run() === FALSE)
    {
      $this->load->view('templates/header', $data);
      $this->load->view('users/create');
      $this->load->view('templates/footer');
    }
    else
    {
      if($this->users_model->set_users()){
        redirect('/posts', 'refresh');
      } else {
        redirect('/users/login', 'refresh');
      }
    }
  }
}