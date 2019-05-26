function dq(selector) {
  return document.querySelector(selector);
}

function testJSON(testStr) {
  try {
    JSON.parse(testStr);
  } catch (e) {
    console.log(e);
  }
}

function showMsg(comment) {
  const item = document.createElement('li');
  item.innerHTML = comment.content;
  dq('.comments__list ul').append(item);
}

function showPagination(req, btnText) {
  if (req.getPageUrl(btnText)) {
    const item = document.createElement('li');
    item.innerText = `${btnText}`;
    dq('.page ul').append(item);
  }
}

class MessageRequest extends XMLHttpRequest {
  constructor() {
    super();
    this.url = 'https://lidemy-book-store.herokuapp.com/posts';
  }

  post(content) {
    super.open('POST', this.url, true);
    super.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    super.send(`content=${content}`);
  }

  get(limit, sort = 'id', order = 'desc') {
    super.open('GET', `${this.url}?_limit=${limit}&_sort=${sort}&_order=${order}`, true);
    super.send();
  }

  getPage(query = '?_limit=20&_page=1&_order=desc') {
    super.open('GET', `${this.url}${query}`, true);
    super.send();
  }

  getPageUrl(pagination) {
    const parser = super.getResponseHeader('link').split(',').filter(link => link.indexOf(pagination) !== -1)[0];
    if (parser) {
      return parser.split(';')[0].slice(1, -1).split('?')[1];
    }
    return null;
  }
}

const readReq = new MessageRequest();
const postReq = new MessageRequest();
const postGetReq = new MessageRequest();
readReq.getPage();

dq('.btn').onclick = () => {
  const content = dq('input').value;
  if (content) {
    postReq.post(content);
    postGetReq.get('1');
    dq('input').value = '';
  } else {
    alert('請輸入訊息');
  }
};

dq('.page').onclick = (e) => {
  if (e.target.tagName === 'LI') {
    readReq.getPage(`?${readReq.getPageUrl(e.target.innerText)}`);
  }
};

readReq.onload = () => {
  if (readReq.status >= 200 && readReq.status < 400) {
    const resultStr = readReq.responseText;
    testJSON(resultStr);
    dq('.comments__list ul').innerHTML = '';
    dq('.page ul').innerHTML = '';
    showPagination(readReq, 'prev');
    showPagination(readReq, 'next');
    JSON.parse(resultStr).forEach((comment) => {
      showMsg(comment);
    });
  } else {
    alert('系統錯誤，請更新');
  }
};

postGetReq.onload = () => {
  if (postGetReq.status >= 200 && postGetReq.status < 400) {
    const resultStr = postGetReq.responseText;
    testJSON(resultStr);
    showMsg(JSON.parse(resultStr)[0]);
  } else {
    alert('系統錯誤，請稍候再留言');
  }
};
