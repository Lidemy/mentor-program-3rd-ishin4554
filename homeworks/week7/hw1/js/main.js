class Time {
  constructor(msTime = Number(Date.now())) {
    this.ttime = msTime;
    this.transTime = this.time / 1000;
  }

  get time() {
    return this.ttime;
  }

  set time(msTime) {
    this.ttime = msTime;
  }

  subTime(time) {
    return time.transTime - this.transTime;
  }
}

// Hadling nodes
function dq(selector) {
  return document.querySelector(selector);
}
function setStyle(node, css) {
  const n = node;
  n.style[Object.keys(css)] = Object.values(css);
}

// Showing informations
function showResult(text) {
  alert(text);
}
function cleanGradeLs(node) {
  node.removeChild(dq('ol'));
}
function showGrade(node, time) {
  const item = document.createElement('li');
  if (time) {
    item.innerText = `${time} 秒`;
    node.appendChild(item);
  }
}
function showGradeLs(gradeLs) {
  const board = dq('.board');
  cleanGradeLs(board);
  const list = document.createElement('ol');
  gradeLs.sort((a, b) => a - b);
  for (let i = 0; i < 3; i += 1) {
    showGrade(list, gradeLs[i]);
  }
  board.appendChild(list);
}

// setting UI
function changeBg(node) {
  setStyle(node, { backgroundColor: `hsl(35,100%,${50 + Math.floor(Math.random() * 50)}%)` });
}
function changeBtn(text) {
  dq('.btn').classList.toggle('hide');
  dq('.btn').innerHTML = text;
}

const gameElement = dq('body');
const startElement = dq('.btn');
let isStart = false;
let clickTime = 0;
let timer = 0;
const gameTime = new Time((Math.random() * 2 + 1) * 1000);
const gradeList = [];

// Game logic
function toggleState() {
  isStart = !isStart;
}

function startGame() {
  setStyle(gameElement, { backgroundColor: '#3ec1d3' });
  clickTime = new Time();
  timer = setTimeout(() => {
    changeBg(gameElement);
  }, gameTime.time);
  changeBtn('Restart');
  toggleState(isStart);
}

function stopGame() {
  if (isStart) {
    const reflectSec = clickTime.subTime(new Time());
    if (reflectSec < gameTime.transTime) {
      showResult('挑戰失敗');
      clearTimeout(timer);
    } else {
      const grade = (reflectSec - gameTime.transTime).toFixed(2);
      showResult(`你的成績：${grade} 秒`);
      gradeList.push(grade);
    }
    startElement.classList.toggle('hide');
  }
  toggleState(isStart);
  gameTime.time = (Math.random() * 2 + 1) * 1000;
}

// Control Events
startElement.addEventListener('click', (e) => {
  startGame();
  e.stopPropagation();
});

gameElement.addEventListener('click', () => {
  stopGame();
  showGradeLs(gradeList);
});

window.addEventListener('keypress', (e) => {
  if (e.key === 'r') {
    startGame();
    e.stopPropagation();
  }
  if (e.key === ' ') {
    stopGame();
    showGradeLs(gradeList);
  }
});
