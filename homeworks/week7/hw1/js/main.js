const gameElement = document.querySelector('body');
const startElement = document.querySelector('.btn');
let time = Math.random() * 2 + 1;
let clickTime = 0;
let state = false;
let timer = 0;
const gradeList = [];

function startGame(e) {
  gameElement.style.backgroundColor = '#3ec1d3';
  clickTime = Date.now();
  timer = setTimeout(() => {
    const rndOrange = 50 + Math.floor(Math.random() * 50);
    gameElement.style.backgroundColor = `hsl(35,100%,${rndOrange}%)`;
  }, time * 1000);
  e.stopPropagation();
  startElement.classList.toggle('hide');
  startElement.innerHTML = 'Restart';
  state = true;
}

function clickGame() {
  if (state) {
    const reflect = (Date.now() - clickTime) / 1000;
    if (reflect < time) {
      alert('挑戰失敗');
      clearTimeout(timer);
    } else {
      const grade = (reflect - time).toFixed(2);
      alert(`你的成績：${grade} 秒`);
      gradeList.push(grade);
    }
    startElement.classList.toggle('hide');
  }
  state = false;
  time = Math.random() * 2 + 1;
}

function showGrade(ls) {
  ls.sort((a, b) => a - b);
  const board = document.querySelector('.board');
  const list = document.createElement('ol');
  board.removeChild(document.querySelector('ol'));
  for (let i = 0; i < 3; i += 1) {
    const item = document.createElement('li');
    if (ls[i]) {
      item.innerText = `${ls[i]} 秒`;
      list.appendChild(item);
    }
  }
  board.appendChild(list);
}

startElement.addEventListener('click', (e) => {
  startGame(e);
});

window.addEventListener('keypress', (e) => {
  if (e.key === 'r') {
    startGame(e);
  }
  if (e.key === ' ') {
    clickGame();
    showGrade(gradeList);
  }
});

gameElement.addEventListener('click', () => {
  clickGame();
  showGrade(gradeList);
});
