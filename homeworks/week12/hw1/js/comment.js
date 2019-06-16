
async function getLike(userID, postID) {
  const response = await fetch(`./handle_post_like.php?user_id=${userID}&post_id=${postID}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

async function generateComment(content, isUser) {
  const item = document.createElement('div');
  await getLike(content.user_id, content.post_id).then((data) => {
    item.innerHTML = `
    <div class='board__comment'>
      <div class='comment__header'>
        <div class='header__nickname'>${content.nickname}</div>
        <div class='header__timestamp'>${content.time}</div>
      </div>
    <div class='comment__content'>
      ${content.content}
      <div class='comment__dash'>
        <div class='dash__like' data-post='${content.post_id}'>Like<span class='like__count'>${data.like_count}</span></div>
        <div class='dash__more' data-post='${content.post_id}'>More</div>
      </div>
    </div>`;
    if (isUser) {
      const html = `
        <a method='GET' href='./handle_delete_post.php?id=${content.time}'>delete</a>
        <a method='GET' href='./update_post.php?id=${content.post_id}'>edit</a>
        </div>
      `;
      item.innerHTML += html;
    } else {
      item.innerHTML += '</div>';
    }
  });
  return item;
}

function dq(selector) {
  return document.querySelector(selector);
}
dq('.board').addEventListener('click', (evt) => {
  if (evt.target.classList.contains('dash__more')) {
    const postID = evt.target.getAttribute('data-post');
    let loginUser = false;
    if (dq('.input__form input[name="user_id"]')) {
      loginUser = dq('.input__form input[name="user_id"]').getAttribute('value');
    }
    fetch(`./handle_post_child.php?post_id=${postID}`, {
      method: 'GET',
    }).then(res => res.text())
      .then((text) => {
        if (text) {
          try {
            const data = JSON.parse(text);
            data.forEach((content) => {
              generateComment(content, content.post_id === loginUser).then((comment) => {
                evt.target.parentNode.parentNode.append(comment);
              });
            });
          } catch (err) {
            console.log(err);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        alert('還沒有留言，請登入留言');
      });
    if (loginUser) {
      const input = document.createElement('div');
      input.innerHTML = `
        <form class='input__form' method='POST' action='./handle_add_post.php'>
          <input type='hidden' value='${loginUser}' name='user_id'>
          <input type='hidden' value='${postID}' name='post_id'>
          <input type='text' class='input__text' name='comment' placeholder='說點什麼'/>
          <button type='submit' class='input__submit'>提交</button>
        </form>
        `;
      evt.target.parentNode.parentNode.parentNode.append(input);
    }
  }
  if (evt.target.classList.contains('dash__like')) {
    if (dq('.input__form input[name="user_id"]')) {
      const userID = dq('.input__form input[name="user_id"]').getAttribute('value');
      const postID = evt.target.getAttribute('data-post');
      getLike(userID, postID).then((data) => {
        evt.target.classList.toggle('bg--like');
        const node = evt.target;
        node.querySelector('span').innerText = data.like_count;
      });
    } else {
      alert('請登入');
    }
  }
});
