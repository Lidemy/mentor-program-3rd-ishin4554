// Hadling nodes
function dq(selector) {
  return document.querySelector(selector);
}
function setStyle(node, css) {
  const n = node;
  n.style[Object.keys(css)] = Object.values(css);
}

// Handling time
function getTimeNow() {
  return Number(Date.now());
}
function subTime(priorTime, laterTime) {
  return laterTime - priorTime;
}
function transTime(msTime) {
  return (msTime / 1000).toFixed(2);
}
function createRndTime() {
  return (Math.random() * 2 + 1) * 1000;
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
let gameTime = createRndTime();
const gradeList = [];

// Game logic
function toggleState() {
  isStart = !isStart;
}

function startGame() {
  setStyle(gameElement, { backgroundColor: '#3ec1d3' });
  clickTime = getTimeNow();
  timer = setTimeout(() => {
    changeBg(gameElement);
  }, gameTime);
  changeBtn('Restart');
  toggleState(isStart);
}

function stopGame() {
  if (isStart) {
    const reflectTime = subTime(clickTime, getTimeNow());
    if (reflectTime < gameTime) {
      showResult('挑戰失敗');
      clearTimeout(timer);
    } else {
      const grade = transTime(reflectTime - gameTime);
      showResult(`你的成績：${grade} 秒`);
      gradeList.push(grade);
    }
    startElement.classList.toggle('hide');
  }
  toggleState(isStart);
  gameTime = createRndTime();
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
