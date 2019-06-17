function dq(selector) {
  return document.querySelector(selector);
}

function getID() {
  let loginUser = false;
  if (dq('.input__form input[name="user_id"]')) {
    loginUser = dq('.input__form input[name="user_id"]').getAttribute('value');
  }
  return Number(loginUser);
}

async function getLike(userID, postID) {
  const response = await fetch(`./handle_post_like.php?user_id=${userID}&post_id=${postID}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

async function generateComment(content, userID, depth) {
  const item = document.createElement('div');
  let html = '';
  if (content.user_id === content.parent_user_id) {
    html += `<div class='board__comment bg--head' data-post='${content.post_id}'>`;
  } else {
    html += `<div class='board__comment' data-post='${content.post_id}'>`;
  }
  html += `
    <div class='comment__header'>
      <div class='header__nickname'>${content.nickname}</div>
      <div class='header__timestamp'>${content.time}</div>
    </div>
  <div class='comment__content'>
    ${content.content}
    <div class='comment__dash'>`;
  if (content.is_like) {
    html += `<div class='dash__like bg--like' data-post='${content.post_id}'>Like<span class='like__count'>${content.like_count}</span></div>`;
  } else {
    html += `<div class='dash__like' data-post='${content.post_id}'>Like<span class='like__count'>${content.like_count}</span></div>`;
  }
  if (depth < 15) {
    html += `<div class='dash__more' data-post='${content.post_id}'>More</div>`;
  }
  if (userID === content.user_id) {
    html += `
      <a method='GET' class='dash__delete' href='./handle_delete_post.php?id=${content.post_id}'>delete</a>
      <a method='GET'  class='dash__edit' href='./update_post.php?id=${content.post_id}'>edit</a>`;
  }
  html += '</div></div>';
  item.innerHTML = html;
  return item;
}

function getDepth(target) {
  let depth = 0;
  let parent = target.parentNode;
  while (!parent.classList.contains('board')) {
    parent = parent.parentNode;
    depth += 1;
  }
  return depth;
}

dq('.board').addEventListener('click', (evt) => {
  if (evt.target.classList.contains('dash__more')) {
    const postID = evt.target.getAttribute('data-post');
    const container = document.createElement('div');
    const loginUser = getID();
    fetch(`./handle_post_child.php?post_id=${postID}&user_id=${loginUser}`, {
      method: 'GET',
    }).then(res => res.text())
      .then((text) => {
        if (text) {
          try {
            const data = JSON.parse(text);
            const depth = getDepth(evt.target);
            data.forEach((content) => {
              generateComment(content, loginUser, depth)
                .then((comment) => {
                  container.append(comment);
                });
            });
            evt.target.parentNode.parentNode.append(container);
            evt.target.parentNode.removeChild(evt.target);
          } catch (err) {
            console.log(`1: ${err}`);
            if (!loginUser) {
              alert('還沒有留言，請登入留言');
            } else {
              evt.target.parentNode.removeChild(evt.target);
            }
          }
        }
      })
      .catch((err) => {
        console.log(`2: ${err}`);
        evt.target.parentNode.removeChild(evt.target);
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
      evt.target.parentNode.parentNode.append(input);
    }
  }
  if (evt.target.classList.contains('dash__like')) {
    if (getID()) {
      const userID = getID();
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
