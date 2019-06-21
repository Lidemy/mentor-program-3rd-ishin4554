/* eslint-env jquery */

function getCookie() {
  const name = 'sessionID=';
  const cookies = document.cookie.split(';');
  let sessionID = '';
  cookies.forEach((cookie) => {
    if (cookie.match(name)) {
      sessionID = cookie.substring(name.length, 64);
    }
  });
  return sessionID;
}

class Task {
  constructor(url, auth) {
    this.url = url;
    this.auth = auth;
  }

  postData(info) {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Auth: this.auth,
      },
      body: JSON.stringify(info),
      mode: 'cors',
    });
  }

  getAllData() {
    return fetch(this.url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Auth: this.auth,
      },
      mode: 'cors',
    });
  }

  getData() {
    return fetch(this.url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Auth: this.auth,
      },
      mode: 'cors',
    });
  }

  updateData(info) {
    return fetch(this.url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Auth: this.auth,
      },
      body: JSON.stringify(info),
      mode: 'cors',
    });
  }

  deleteData() {
    return fetch(this.url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Auth: this.auth,
      },
      mode: 'cors',
    });
  }
}

function generateNav(auth) {
  if (auth === 'logout') {
    $('.nav').append(`
    <li class="nav-item">
      <a class="nav-link active" href="./login.html">Login</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="./register.html">Register</a>
    </li>
    `);
  } else {
    $('.nav').html('').append(`
    <li class="nav-item">
      <a class="nav-link active nav__logout" href="#" >logout</a>
    </li>
    `);
  }
}

function generateTask(auth, user, tasks) {
  let html = '';
  if (auth === user) {
    tasks.forEach((task) => {
      if (task.date !== '0000-00-00') {
        html += `
        <li class="list-group-item list-group-item-dark"  data-task="${task.task_id}" data-date="${task.date}">
          <span>${task.name}</span>
          <a href="#" class="badge badge-warning task__edit">Edit</a>
          <a href="#" class="badge badge-danger task__delete">Delete</a>
        </li>`;
      } else {
        html += `
        <li class="list-group-item"  data-task="${task.task_id}" data-date="${task.date}">
          <span>${task.name}</span>
          <a href="#" class="badge badge-warning task__edit">Edit</a>
          <a href="#" class="badge badge-danger task__delete">Delete</a>
        </li>`;
      }
    });
    html += `  
    <li class="list-group-item">
      <input type="text" class="form-control add__task" placeholder="press enter to add">
    </li>`;
  } else {
    tasks.forEach((task) => {
      if (task.date !== '0000-00-00') {
        html += `
        <li class="list-group-item list-group-item-dark" data-task="${task.task_id}" data-date="${task.date}">
          ${task.name}
        </li>`;
      } else {
        html += `
        <li class="list-group-item" data-task="${task.task_id}" data-date="${task.date}">
          ${task.name}
        </li>`;
      }
    });
  }
  return html;
}

function generateList(auth, list) {
  const userID = Number(list.user.user_id);
  let html = `<div class="card" style="width: 20rem;" data-user="${userID}">`;
  if (auth === userID) {
    html += `
      <div class="card-body">
        <h5 class="card-title">
          <span>${list.user.nickname}</span>
          <a href="#" class="badge badge-warning nickname__edit">Edit</a>
        </h5>

        <p class="card-text">
          <span>${list.user.intro}</span>
          <a href="#" class="badge badge-warning intro__edit">Edit</a>
        </p>
      </div>`;
  } else {
    html += `
      <div class="card-body">
        <h5 class="card-title">${list.user.nickname}</h5>
        <p class="card-text">${list.user.intro}</p>
      </div>`;
  }
  html += `
    <ul class="list-group list-group-flush tasks">
        ${generateTask(auth, userID, list.tasks)}
      </ul>
      <div class="card-body">
        <a href="https://github.com/Lidemy/mentor-program-3rd-ishin4554" class="card-link">Github link</a>
      </div>
    </div>
    `;
  $('.container-fluid').prepend(html);
}

function appendContainer(auth, lists) {
  $('.container-fluid').html('');
  lists.forEach((list) => {
    generateList(auth, list);
  });
  generateNav(auth);
}

$(document).ready(() => {
  const data = new Task('./lists', getCookie());
  data.getAllData().then(res => res.text())
    .then((text) => {
      try {
        const allData = JSON.parse(text);
        console.log(allData);
        appendContainer(allData.state, allData.content);
      } catch (err) {
        console.log(text);
        console.log(err);
      }
    });
});
function addTask(info, userID) {
  const data = new Task('./lists', getCookie());
  data.postData(info)
    .then(res => res.text())
    .then((text) => {
      console.log(text);
      $('input:focus').val('');
    })
    .then(() => {
      const update = new Task(`./list/${userID}`, getCookie());
      update.getData().then(res => res.text())
        .then((text) => {
          try {
            const allData = JSON.parse(text);
            const items = generateTask(allData.state, userID, allData.content);
            $(`.card[data-user="${userID}"] .tasks`).html('').append(items);
          } catch (err) {
            console.log(text);
            console.log(err);
          }
        });
    });
}

function updateTask(element, userID, taskID, info) {
  const data = new Task(`./list/${userID}/task/${taskID}`, getCookie());
  data.updateData(info)
    .then(res => res.text())
    .then((text) => {
      try {
        const allData = JSON.parse(text);
        console.log(data);
        element.html('').append(generateTask(allData.state, Number(userID), allData.content));
      } catch (err) {
        console.log(text);
        console.log(err);
      }
    });
}

function deleteTask(element, userID, taskID) {
  const data = new Task(`./list/${userID}/task/${taskID}`, getCookie());
  data.deleteData()
    .then(res => res.text())
    .then((text) => {
      try {
        const allData = JSON.parse(text);
        const items = generateTask(allData.state, Number(userID), allData.content);
        element.html('').append(items);
      } catch (err) {
        console.log(text);
        console.log(err);
      }
    });
}

const currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

$('body').on('click', '.nav__logout', () => {
  const date = new Date();
  date.setTime(date.getTime() - 300000);
  document.cookie = `sessionID=; expires=${date.toUTCString()}`;
  window.location.href = './index.html';
});

$(document).on('keypress', (evt) => {
  if (evt.key === 'Enter') {
    if ($('input:focus').hasClass('add__task')) {
      const userID = Number($('input:focus').parent().parent().parent()
        .attr('data-user'));
      const info = {
        name: $('input:focus').val(),
        date: '0000-00-00',
        user_id: userID,
      };
      addTask(info, userID);
    }
    if ($('input:focus').hasClass('update__task')) {
      const userID = Number($('input:focus').parent().parent().parent()
        .attr('data-user'));
      const taskID = Number($('input:focus').attr('data-task'));
      const info = {
        name: $('input:focus').val(),
        date: '0000-00-00',
      };
      updateTask($('input:focus').parent().parent(), userID, taskID, info);
    }
  }
});

$('body').on('click', (evt) => {
  if ($(evt.target).hasClass('task__delete')) {
    evt.preventDefault();
    const userID = $(evt.target).parent().parent().parent()
      .attr('data-user');
    const taskID = $(evt.target).parent().attr('data-task');
    const element = $(evt.target).parent().parent();
    console.log(`${userID} ${taskID}`);
    deleteTask(element, userID, taskID);
  } else if ($(evt.target).hasClass('task__edit')) {
    evt.preventDefault();
    const taskID = $(evt.target).parent().attr('data-task');
    const value = $(evt.target).prev().text();
    $(evt.target).parent().html('').append(`
      <input type="text" class="form-control update__task" value="${value}" data-task="${taskID}">
    `);
  } else if ($(evt.target).hasClass('list-group-item')) {
    const taskID = $(evt.target).attr('data-task');
    const userID = $(evt.target).parent().parent().attr('data-user');
    const element = $(evt.target).parent();
    const info = {
      name: $(evt.target).children('span').text(),
      date: currentDate,
      user_id: userID,
    };
    updateTask(element, userID, taskID, info);
  }
});
