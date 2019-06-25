/* eslint-env jquery */

function getSessionID() {
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

class Post {
  constructor(url) {
    this.url = url;
    this.auth = getSessionID();
  }

  getPosts() {
    return fetch(this.url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Auth: this.auth,
      },
    });
  }

  getPost(postID) {
    return fetch(`${this.url}/${postID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Auth: this.auth,
      },
    });
  }

  addPost(info) {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Auth: this.auth,
      },
      body: JSON.stringify(info),
    });
  }

  updatePost(postID, info) {
    return fetch(`${this.url}/${postID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Auth: this.auth,
      },
      body: JSON.stringify(info),
    });
  }

  deletePost(postID) {
    return fetch(`${this.url}/${postID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Auth: this.auth,
      },
    });
  }

  toggleLike(postID, info) {
    return fetch(`${this.url}/${postID}/like`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Auth: this.auth,
      },
      body: JSON.stringify(info),
    });
  }
}

function generatePage(data) {
  let html = '';
  if (data.state === 'logout') {
    html += `
      <li class="nav-item">
        <a class="nav-link" href="./">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="./login">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="./register">Register</a>
      </li>
      `;
  } else {
    $('.comment__input').html('').append(`
      <label for="exampleFormControlTextarea1">留言內容</label>
      <input type="text" class="form-control input__add" data-post="0" data-user="${data.state}"placeholder="add post by enter">
    `);
    html += `
      <li class="nav-item">
        <a class="nav-link" href="./">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link logout__link" href="#">Logout</a>
      </li>
      `;
    if (data.permission.permission === 'admin') {
      html += `
      <li class="nav-item">
        <a class="nav-link" href="./backstage">Backstage</a>
      </li>
      `;
    }
    if (data.permission.permission === 'super admin') {
      html += `
      <li class="nav-item">
        <a class="nav-link" href="./backstage">Backstage</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="./permission">Permission</a>
      </li>
      `;
    }
  }

  $('.navbar-nav').html('').append(html);
}

function generatePost(data, element) {
  console.log(data);
  data.content.forEach((post) => {
    let html = '';
    let contentHTML = '';
    if (element.hasClass('more')) {
      const parentID = element.attr('data-parent');
      if (parentID === post.user_id) {
        contentHTML += `<div class="mb-1 post__content bg--parent">${post.content}</div>`;
      } else {
        contentHTML += `<div class="mb-1 post__content">${post.content}</div>`;
      }
    } else {
      contentHTML += `<div class="mb-1 post__content">${post.content}</div>`;
    }
    html += `
      <div class="list-group-item list-group-item-action" data-post="${post.post_id}" data-user="${post.user_id}">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${post.nickname}</h5>
          <small>${post.time}</small>
        </div>
        ${contentHTML}`;

    if (data.state === 'logout') {
      html += `
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example" data-post="${post.post_id}">
          <button type="button" class="btn btn-secondary like">Like<span class='like__count'>${post.likes}</span></button>
          <button type="button" class="btn btn-secondary comment">Comment</button>
        </div> `;
    } else {
      let likeHTML = '';
      if (Number(post.is_liked) === 1) {
        likeHTML += `<button type="button" class="btn btn-primary like">Like<span class='like__count'>${post.likes}</span></button>`;
      } else {
        likeHTML += `<button type="button" class="btn btn-secondary like">Like<span class='like__count'>${post.likes}</span></button>`;
      }
      const updateHTML = `
        <button type="button" class="btn btn-secondary edit">Edit</button>
        <button type="button" class="btn btn-secondary delete">Delete</button>
      `;
      if (window.location.pathname === '/group1/ishin4554/w13/hw3/'
        || window.location.pathname === '/group1/ishin4554/w13/hw3/index.html') {
        if (data.state === Number(post.user_id)) {
          html += `
          <div class="btn-group btn-group-sm" role="group" aria-label="Basic example" data-post="${post.post_id}">
            ${updateHTML}
            ${likeHTML}
            <button type="button" class="btn btn-secondary comment">Comment</button>
          </div> `;
        } else {
          html += `
          <div class="btn-group btn-group-sm" role="group" aria-label="Basic example" data-post="${post.post_id}">
            ${likeHTML}
            <button type="button" class="btn btn-secondary comment">Comment</button>
          </div> `;
        }
      } else if (window.location.pathname === '/group1/ishin4554/w13/hw3/backstage') {
        if (data.permission.permission !== 'normal') {
          html += `
          <div class="btn-group btn-group-sm" role="group" aria-label="Basic example" data-post="${post.post_id}">
            ${updateHTML}
            <button type="button" class="btn btn-secondary comment">Comment</button>
          </div> `;
        }
      }
    }

    html += '</div>';
    element.append(html);
  });
}

async function appendPosts(element, url) {
  const post = new Post(url);
  const response = await post.getPosts();
  const text = await response.text();
  const data = await JSON.parse(text);
  generatePost(data, element);
  $('.pagination').html('').attr('data-page', data.links.now);
  if (Object.prototype.hasOwnProperty.call(data.links, 'prev')) {
    $('.pagination').append(`<li class="page-item"><a class="page-link" href="${data.links.prev}">Previous</a></li>`);
  }
  if (Object.prototype.hasOwnProperty.call(data.links, 'next')) {
    $('.pagination').append(`<li class="page-item"><a class="page-link" href="${data.links.next}">Next</a></li>`);
  }
  generatePage(data);
}

// Async Function
async function appendChildPosts(postID, element) {
  const post = new Post('./post');
  const response = await post.getPost(postID);
  const text = await response.text();
  const data = await JSON.parse(text);
  if (data.type === 'success' && data.state !== 'logout') {
    element.children('.more').remove();
    element.append(`
      <div class='more' data-parent='${element.attr('data-user')}'></div>
    `);
    generatePost(data, element.children('.more'));
    element.append(`
    <input type="text" class="form-control input__add" data-post="${postID}" 
    placeholder="add post by enter">
  `);
  } else {
    element.children('.more').remove();
    element.append(`
      <div class='more' data-parent='${element.attr('data-user')}'></div>
    `);
    generatePost(data, element.children('.more'));
  }
}

async function addPost(element, info) {
  const post = new Post('./posts');
  const response = await post.addPost(info);
  const text = await response.text();
  const data = await JSON.parse(text);
  if (data.type === 'success' && info.parent_id === 0) {
    element.html('');
    appendPosts(element, `./posts?page=${$('.pagination').attr('data-page')}`);
  } else {
    appendChildPosts(info.parent_id, element);
  }
}

async function deletePost(postID) {
  const post = new Post('./post');
  const response = await post.deletePost(postID);
  const text = await response.text();
  const data = await JSON.parse(text);
  if (data.type === 'success') {
    $('.board').html('');
    appendPosts($('.board'), `./posts?page=${$('.pagination').attr('data-page')}`);
  }
}

async function editPost(postID, info) {
  const post = new Post('./post');
  const response = await post.updatePost(postID, info);
  const text = await response.text();
  const data = await JSON.parse(text);
  if (data.type === 'success') {
    $('.board').html('');
    appendPosts($('.board'), `./posts?page=${$('.pagination').attr('data-page')}`);
  }
}

async function toggleLike(postID, info, element) {
  const post = new Post('./post/');
  const response = await post.toggleLike(postID, info);
  const text = await response.text();
  const data = await JSON.parse(text);
  if (data.type === 'success') {
    element.text(`${data.likes}`);
    element.parent().toggleClass('btn-secondary').toggleClass('btn-primary');
  }
}

// Listenr
// Site Start
$(document).ready(() => {
  appendPosts($('.board'), './posts?page=1');
});

// Click Button
$('body').on('click', (evt) => {
  // delete
  if ($(evt.target).hasClass('delete')) {
    const postID = $(evt.target).parent().attr('data-post');
    deletePost(postID);
  }
  // edit
  if ($(evt.target).hasClass('edit')) {
    const postID = Number($(evt.target).parent().attr('data-post'));
    const content = $(evt.target).parent().parent().children('.post__content')
      .text();
    $(evt.target).parent().parent().children('.post__content')
      .html('')
      .append(`
      <input type="text" class="form-control input__edit" data-post="${postID}" 
      placeholder="add post by enter" value="${content}">
    `);
  }
  // like
  if ($(evt.target).hasClass('like')) {
    if (getSessionID() !== '') {
      const postID = Number($(evt.target).parent().attr('data-post'));
      const info = {
        user_id: $('.input__add').attr('data-user'),
      };
      toggleLike(postID, info, $(evt.target).children('span'));
    } else {
      alert('請登入');
    }
  }
  // more comment
  if ($(evt.target).hasClass('comment')) {
    const postID = Number($(evt.target).parent().attr('data-post'));
    appendChildPosts(postID, $(evt.target).parent().parent());
    $(evt.target).remove();
  }
  // pagination
  if ($(evt.target).hasClass('page-link')) {
    evt.preventDefault();
    $('.board').html('');
    appendPosts($('.board'), $(evt.target).attr('href'));
  }
  // logout
  if ($(evt.target).hasClass('logout__link')) {
    evt.preventDefault();
    const date = new Date();
    date.setTime(date.getTime() - 300000);
    document.cookie = `sessionID=; expires=${date.toUTCString()}`;
    window.location.href = './index.html';
  }
});

// Finish Input
$('body').on('keypress', (evt) => {
  if (evt.key === 'Enter') {
    if ($('input:focus').hasClass('input__add')) {
      const parentID = Number($('input:focus').attr('data-post'));
      if (parentID === 0) {
        const element = $('.board');
        const userID = Number($('input:focus').attr('data-user'));
        const info = {
          user_id: userID,
          content: $('input:focus').val(),
          parent_id: parentID,
        };
        addPost(element, info);
        $('input:focus').val('');
      } else {
        const element = $('input:focus').parent();
        const info = {
          user_id: $('.input__add').attr('data-user'),
          content: $('input:focus').val(),
          parent_id: parentID,
        };
        addPost(element, info);
        $('input:focus').remove();
      }
    }
    if ($('input:focus').hasClass('input__edit')) {
      const userID = Number($('input:focus').parent().attr('data-user'));
      const postID = Number($('input:focus').attr('data-post'));
      const info = {
        user_id: userID,
        content: $('input:focus').val(),
      };
      editPost(postID, info);
    }
  }
});
