const request = new XMLHttpRequest();
const url = 'https://lidemy-book-store.herokuapp.com/posts';

request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    const result = JSON.parse(request.responseText);
    console.log(result);
    result.forEach((comment) => {
      const item = document.createElement('li');
      item.innerHTML = comment.content;
      document.querySelector('ul').prepend(item);
    });
    document.querySelector('input').value = '';
  } else {
    alert('系統錯誤，請稍候再留言');
  }
};
request.onerror = () => {
  alert('系統錯誤，請稍候再留言');
  console.log(request.responseText);
};

request.open('GET', `${url}?_limit=20&_sort=id&_order=asc`, true);
request.send();

document.querySelector('.btn').onclick = () => {
  const content = document.querySelector('input').value;
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.send(`content=${content}`);
  request.open('GET', `${url}?_limit=1&_sort=id&_order=desc`, true);
  request.send();
};
