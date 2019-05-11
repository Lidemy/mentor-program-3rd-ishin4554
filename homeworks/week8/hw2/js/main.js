const request = new XMLHttpRequest();
const postReq = new XMLHttpRequest();
const url = 'https://lidemy-book-store.herokuapp.com/posts';
let ready = false;
const data = [];
// Show comments message on the site
function showMsg(comments) {
  comments.forEach((comment) => {
    const item = document.createElement('li');
    item.innerHTML = comment.content;
    if (!ready) {
      document.querySelector('.comments__list ul').append(item);
    } else {
      document.querySelector('.comments__list ul').prepend(item);
    }
  });
  document.querySelector('input').value = '';
  ready = true;
}
// Show pages button on the site
function showPagination(allData) {
  document.querySelector('.page').removeChild(document.querySelector('ul'));
  const ls = document.createElement('ul');
  document.querySelector('.page').appendChild(ls);
  for (let i = 1; i <= allData.length / 20 + 1; i += 1) {
    const page = document.createElement('li');
    page.innerText = i;
    document.querySelector('.page ul').append(page);
  }
}
// First loading the data
request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    const result = JSON.parse(request.responseText);
    result.forEach(r => data.push(r));
    showMsg(data.slice(0, 20));
    showPagination(data);
  } else {
    alert('系統錯誤，請更新');
  }
};
// Request loading and show the message
postReq.onload = () => {
  if (postReq.status >= 200 && postReq.status < 400) {
    const result = JSON.parse(postReq.responseText);
    showMsg(result);
    data.unshift(result[0]);
  } else {
    alert('系統錯誤，請稍候再留言');
  }
};

request.open('GET', `${url}?_sort=id&_order=desc`, true);
request.send();

// Post the comment
document.querySelector('.btn').onclick = () => {
  if (document.querySelector('.btn')) {
    const content = document.querySelector('input').value;
    postReq.open('POST', url, true);
    postReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    postReq.send(`content=${content}`);
    postReq.open('GET', `${url}?_limit=1&_sort=id&_order=desc`, true);
    postReq.send();
    showPagination(data);
  } else {
    alert('請輸入訊息');
  }
};
// Change page
document.querySelector('.page').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const page = e.target.innerText;
    document.querySelector('.comments__list').removeChild(document.querySelector('.comments__list ul'));
    const ls = document.createElement('ul');
    document.querySelector('.comments__list').appendChild(ls);
    ready = false;
    showMsg(data.slice((page - 1) * 20, page * 20));
  }
});
