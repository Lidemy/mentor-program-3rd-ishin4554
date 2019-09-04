<?php
class Posts extends CI_Controller {
  public function __construct()
  {
    parent::__construct();
    $this->load->model('posts_model');
    $this->load->library('session');
  }

  public function index()
  {
    $data['posts'] = $this->posts_model->get_posts();
    $data['title'] = '留言板';

    $this->load->view('templates/header', $data);
    $this->load->view('posts/index', $data);
    $this->load->view('templates/footer');
  }

  public function view($id = NULL)
  {
    $data['posts_item'] = $this->posts_model->get_posts($id);

    if (empty($data['posts_item']))
    {
      show_404();
    }

    $data['title'] = $data['posts_item']['id'];

    $this->load->view('templates/header', $data);
    $this->load->view('posts/view', $data);
    $this->load->view('templates/footer');
  }

  public function create()
  {
    $this->load->helper('form');
    $this->load->library('form_validation');

    $data['title'] = '新增留言';

    $this->form_validation->set_rules('content', 'content', 'required');

    if ($this->form_validation->run() === FALSE)
    {
        $this->load->view('templates/header', $data);
        $this->load->view('posts/create');
        $this->load->view('templates/footer');
    }
    else
    {
        $this->load->helper('url');
        $this->posts_model->set_posts();
        redirect('/posts', 'refresh');
    }
  }

  public function delete($id)
  {
    $this->load->helper('url');
    $this->posts_model->delete_posts($id);
    redirect('/posts', 'refresh');
  }

  public function update($id = NULL)
  {
    $this->load->helper('form');
    $this->load->library('form_validation');

    $data['title'] = '編輯留言';
    $data['id'] = $id;

    $this->form_validation->set_rules('content', 'content', 'required');

    if ($this->form_validation->run() === FALSE)
    {
        $this->load->view('templates/header', $data);
        $this->load->view('posts/update', $data);
        $this->load->view('templates/footer');
    }
    else
    {
      $this->load->helper('url');
      $this->posts_model->update_posts($this->input->post('id'));
      redirect('/posts', 'refresh');
    }
  }
}