const request = new XMLHttpRequest();
const url = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
let timer = 0;

function dq(selector) {
  return document.querySelector(selector);
}

function showErrMsg() {
  alert('系統不穩定，請再試一次');
  dq('.btn').style.display = 'block';
  dq('h1').innerHTML = '再來一次';
}

function canvasFlash() {
  const canvas = document.createElement('canvas');
  dq('body').prepend(canvas);
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  let row = 0;
  let col = 0;
  timer = setInterval(() => {
    ctx.clearRect(0, 0, 300, 300);
    if (col <= 300) {
      if (row <= 300) {
        ctx.fillStyle = 'rgba(255,255,255, 1)';
        ctx.fillRect(row + 10, col + 10, 90, 90);
        row += 100;
      } else {
        col += 100;
        row = 0;
      }
    } else {
      col = 0;
    }
  }, 50);
}

class Prize {
  constructor(prize, bgColor, textColor, borderColor, msg) {
    this.prize = prize;
    this.bgColor = bgColor;
    this.textColor = textColor;
    this.borderColor = borderColor;
    this.msg = msg;
  }

  setStyle() {
    dq('body').style.backgroundColor = this.bgColor;
    dq('h1').style.color = this.textColor;
  }

  showImg() {
    dq('.result').className = 'result';
    dq('.result').classList.add(this.prize);
  }

  showMsg() {
    dq('h1').innerHTML = this.msg;
    dq('.btn').classList.toggle('hidden');
  }

  runEffect() {
    dq('.result').classList.toggle('hidden');
    dq('.btn').classList.toggle('hidden');
    canvasFlash();
    dq('h1').innerHTML = '抽獎中';
    setTimeout(() => {
      clearInterval(timer);
      dq('body').removeChild(dq('canvas'));
      this.setStyle();
      this.showImg();
      this.showMsg();
    }, 3000);
  }
}

const firstPrize = new Prize('first', '#a2d5f2', '#07689f', '#a2d5f2', '恭喜你中頭獎了！<br><span>日本東京來回雙人遊！</span>');
const secondPrize = new Prize('second', '#ff7e67', '#fafafa', '#ff7e67', '二獎！<br><span>90 吋電視一台！</span>');
const thirdPrize = new Prize('third', '#ff7e67', '#fafafa', '#ff7e67', '恭喜你抽中三獎<br><span>知名 YouTuber 簽名握手會入場券一張，bang！</span>');
const nonePrize = new Prize('none', '#07689f', '#fafafa', '#07689f', '銘謝惠顧');

request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    const result = JSON.parse(request.responseText).prize;
    switch (result) {
      case 'FIRST':
        firstPrize.runEffect();
        break;
      case 'SECOND':
        secondPrize.runEffect();
        break;
      case 'THIRD':
        thirdPrize.runEffect();
        break;
      case 'NONE':
        nonePrize.runEffect();
        break;
      default:
        showErrMsg();
        break;
    }
  } else {
    showErrMsg();
  }
};

dq('.btn').onclick = () => {
  request.open('GET', url, true);
  request.send();
};
