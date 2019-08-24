

$('.nav__submit').click(() => {
  const tags = [];
  $('.board__list').children('.active').each((idx, item) => {
    tags.push($(item).attr('data-value'));
  })
  createTask(tags);
});

$('.board__list').click((evt) => {
  if($(evt.target).hasClass('task__btn')) {
    toggleTask($(evt.target).parent());
  }
  if($(evt.target).hasClass('board__task')) {
    $('.tag__count').text()
    $(evt.target).toggleClass('active');
    $('.tag__count').text($('.board__list').children('.active').length)
  }
  if($(evt.target).hasClass('task__delete')) {
    deleteTask($(evt.target).parent());
  }
  if($(evt.target).hasClass('task__title')) {
    const list = $(evt.target).parent();
    const title = $(evt.target).text();
    const url = $(evt.target).attr('href');
    list.html('');
    list.append(`
      <input type='text' name='title' placeholder='輸入修改 title'/>
      <input type='text' name='url' placeholder='輸入修改 url'/>
      </br>
      <span class="edit__submit badge badge-success">送出</span>
      <span class="edit__cancel badge badge-danger">取消</span>
    `)
  }
  if($(evt.target).hasClass('edit__cancel')) {
    readTask();
  }
  if($(evt.target).hasClass('edit__submit')) {
    updateTask($(evt.target).parent());
  }
})

$('input[name="tag"]').focus(() => {
  $('input[name="tag"]').attr('placeholder', '直接點擊相關任務')
})

$(document).ready(()=>{
  readTask();
});

function createTask(tags){
  fetch('./task.php', {
    method: 'POST',
    body: JSON.stringify({
      title: $('input[name="title"]').val(),
      url: $('input[name="url"]').val(),
      tags: tags,
    })
  })
  .then(res => res.text()) 
  .then(()=> {
    $('input[name="title"]').val('');
    $('input[name="url"]').val();
    readTask();
  })
}
function deleteTask(node){
  fetch(`./task.php?id=${node.attr('data-value')}`, {
    method: 'DELETE',
  })
  .then(res => res.text()) 
  .then((text)=> {
    console.log(text)
    readTask();
  })
}
function updateTask(node){
  fetch(`./task.php?id=${node.attr('data-value')}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: node.children('input[name="title"]').val(),
      url: node.children('input[name="url"]').val(),
    })
  })
  .then(res => res.text()) 
  .then(()=> {
    readTask();
  })
}

function toggleTask(node){
  fetch(`./task.php?id=${node.attr('data-value')}`, {
    method: 'GET',
  })
  .then(res => res.text()) 
  .then((text)=> {
    return JSON.parse(text);
  })
  .then((data) => {
    render(data.tasks);
  });
}
function readTask(){
  fetch('./task.php', {
    method: 'GET',
  })
  .then(res => res.text()) 
  .then((text)=> {
    return JSON.parse(text);
  })
  .then((data) => {
    render(data.tasks);
    generateList(data.tasks);
  });
}

function render(tasks){
  $('.board__list').html('');
  tasks.forEach((task) => {
    let ele = '';
    if(task.is_achieved){
      ele = `
      <li data-value='${task._id.$oid}' class="board__task list-group-item list-group-item-action">
        <span class='task__title'>${task.title}</span>
        <a href="${task.url}" target='_blank' class="task__btn badge badge-secondary">點開閱讀</a>
        <span class="task__delete badge badge-danger">刪除</span>
      </li>
    `;
    } else {
      ele = `
      <li data-value='${task._id.$oid}' class="board__task list-group-item list-group-item-action">
        <span class='task__title'>${task.title}</span>
        <span target='_blank' class="task__btn badge badge-success">取消已讀</span>
        <span class="task__delete badge badge-danger">刪除</span>
      </li>
    `;
    }
    $('.board__list').append(ele);
  })
}

function generateList(tasks){
  const dataset = {
    nodes: [],
    links: []
  }
  tasks.forEach((task) => {
    dataset.nodes.push({
      title: task.title,
      url: task.url
    })
    dataset.links = dataset.links.concat(task.tags)
  })
  return dataset;
}

function generateGraph(){}
