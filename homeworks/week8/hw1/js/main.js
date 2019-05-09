const request = new XMLHttpRequest();
const url = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
function showMessage(msg, textCol, bgCol) {
  console.log(msg);
  document.querySelector('h1').innerHTML = msg;
  document.querySelector('h1').style.color = textCol;
  document.querySelector('body').style.backgroundColor = bgCol;
}
function showImg(prize, bdCol) {
  document.querySelector('.result').removeChild(document.querySelector('.loading'));
  const item = document.createElement('div');
  item.classList.add('loading');
  item.innerHTML = `
    <ul><li></li><li></li><li></li></ul>
    <ul><li></li><li></li><li></li></ul>
    <ul><li></li><li></li><li></li></ul>
  `;
  document.querySelector('.result').append(item);
  document.querySelector('.result').classList.add(prize);
  document.querySelectorAll('li').forEach((node) => {
    const block = node;
    block.style.borderColor = bdCol;
  });
}
function resetHTML() {
  document.querySelector('.result').className = 'result';
  document.querySelector('.result').removeChild(document.querySelector('.loading'));
  const item = document.createElement('div');
  item.classList.add('loading');
  item.innerHTML = `
    <ul><li class="white"></li><li></li><li class="white"></li></ul>
    <ul><li></li><li class="white"></li><li></li></ul>
    <ul><li class="white"></li><li></li><li class="white"></li></ul>
  `;
  document.querySelector('.result').append(item);
}
function setStyle(textCol, bgCol) {
  document.querySelector('body').style.backgroundColor = bgCol;
  document.querySelector('h1').style.color = textCol;
}
function runEffect(prize, msg, textCol, bgCol, bdCol) {
  let time = 0;
  const timer = setInterval(() => {
    const rowElements = document.querySelectorAll('ul');
    time += 1;
    rowElements.forEach((row) => {
      row.querySelectorAll('li').forEach((col, idx) => {
        if (idx % 2 === 0) {
          col.classList.toggle('white');
        } else {
          col.classList.toggle('white');
        }
      });
    });
    if (time === 20) {
      clearInterval(timer);
      showImg(prize, bdCol);
      document.querySelector('.btn').style.display = 'block';
      showMessage(msg);
      setStyle(textCol, bgCol);
    }
  }, 100);
}

request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    const result = JSON.parse(request.responseText).prize;
    let obj = {};
    switch (result) {
      case 'FIRST':
        obj = {
          prize: 'first',
          msg: '恭喜你中頭獎了！<br><span>日本東京來回雙人遊！</span>',
          textCol: '#07689f',
          bgCol: '#a2d5f2',
          bdCol: '#a2d5f2',
        };
        runEffect(obj.prize, obj.msg, obj.textCol, obj.bgCol, obj.bdCol);
        break;
      case 'SECOND':
        obj = {
          prize: 'second',
          msg: '二獎！<br><span>90 吋電視一台！</span>',
          textCol: '#fafafa',
          bgCol: '#ff7e67',
          bdCol: '#ff7e67',
        };
        runEffect(obj.prize, obj.msg, obj.textCol, obj.bgCol, obj.bdCol);
        break;
      case 'THIRD':
        obj = {
          prize: 'third',
          msg: '恭喜你抽中三獎<br><span>知名 YouTuber 簽名握手會入場券一張，bang！</span>',
          textCol: '#fafafa',
          bgCol: '#ff7e67',
          bdCol: '#ff7e67',
        };
        runEffect(obj.prize, obj.msg, obj.textCol, obj.bgCol, obj.bdCol);
        break;
      case 'NONE':
        obj = {
          prize: 'none',
          msg: '銘謝惠顧',
          textCol: '#fafafa',
          bgCol: '#07689f',
          bdCol: '#07689f',
        };
        runEffect(obj.prize, obj.msg, obj.textCol, obj.bgCol, obj.bdCol);
        break;
      default:
        alert('系統不穩定，請再試一次');
        document.querySelector('.btn').style.display = 'block';
        showMessage('再來一次');
        break;
    }
  } else {
    alert('系統不穩定，請再試一次');
    document.querySelector('.btn').style.display = 'block';
    showMessage('再來一次');
  }
};
document.querySelector('.btn').onclick = () => {
  resetHTML();
  request.open('GET', url, true);
  request.send();
  document.querySelector('.btn').style.display = 'none';
  document.querySelector('h1').innerHTML = '抽獎中';
};
