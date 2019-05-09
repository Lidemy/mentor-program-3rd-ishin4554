const request = new XMLHttpRequest();
const url = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
function showMessage(text, textCol, bgCol) {
  document.querySelector('h1').innerHTML = text;
  document.querySelector('h1').style.color = textCol;
  document.querySelector('body').style.backgroundColor = bgCol;
}
function showImg(item, img) {
  item.setAttribute('src', img);
  document.querySelector('h1').prepend(item);
}

request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    const result = JSON.parse(request.responseText).prize;
    const item = document.createElement('img');
    switch (result) {
      case 'FIRST':
        showMessage('恭喜你中頭獎了！日本東京來回雙人遊！', '#112d4e', '#dbe2ef');
        showImg(item, 'http://img.d3consulting.org/uploads/20180913102135_1.jpg');
        break;
      case 'SECOND':
        showMessage('二獎！90 吋電視一台！', '#f9f7f7', '#3f72af');
        showImg(item, 'https://www.lg.com/tw/images/tvs/42ls4600/gallery/large01.jpg');
        break;
      case 'THIRD':
        showMessage('恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！', '#f9f7f7', '#3f72af');
        showImg(item, 'https://www.lg.com/tw/images/tvs/42ls4600/gallery/large01.jpg');
        break;
      case 'NONE':
        showMessage('銘謝惠顧', '#f9f7f7', '#112d4e');
        if (document.querySelector('img')) {
          document.querySelector('body').removeChild(document.querySelector('img'));
        }
        break;
      default:
        alert('系統不穩定，請再試一次');
        break;
    }
  }
};
request.onerror = () => {
  alert('系統不穩定，請再試一次');
};

document.querySelector('.btn').onclick = () => {
  request.open('GET', url, true);
  request.send();
};
