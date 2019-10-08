const cursor = document.querySelector('.cursor')
let posX, posY; 

const Eye = {
  openEye : () => {
    cursor.querySelector('circle').style.r = 3;
    cursor.querySelector('ellipse').style.ry = 5;
    cursor.querySelector('circle').classList.toggle('open');
    cursor.querySelector('ellipse').classList.toggle('open');
    cursor.classList.toggle('open');  
  }, 
  closeEye : () => {
    cursor.querySelector('circle').style.r = 1;
    cursor.querySelector('ellipse').style.ry = 3;
    cursor.querySelector('circle').classList.toggle('open');
    cursor.querySelector('ellipse').classList.toggle('open');
    cursor.classList.toggle('open');
  },
  turnEye : () => {
    if(posX < document.body.scrollWidth / 2) {
      cursor.querySelector('circle').style.cx = 18;
    }
    if(posX > document.body.scrollWidth / 2) {
      cursor.querySelector('circle').style.cx = 12;
    }
  },
  resetEye : () => {
    cursor.classList.remove('hugify')
    cursor.style.background='transparent';
    cursor.querySelector('svg').classList.remove('hidden')
  },
  hugifyEye: (url) => {
    cursor.classList.add('hugify')
    cursor.style.background=`url('${url}')`
    cursor.querySelector('svg').classList.add('hidden')
  },
  clickEye: () => {
    cursor.classList.add('click')
  },
  noClickEye: () => {
    cursor.classList.remove('click')
  },
}


document.querySelector('html').addEventListener('mousemove', (evt) => {
  handleMove(evt);
})

function handleMove(evt) {
  posX = evt.pageX;
  posY = evt.pageY;
  window.requestAnimationFrame(handleUpdate)
}
function handleUpdate() {
  cursor.style.transform=`translate(${posX + 20}px, ${posY + 20}px) scale(1.5)`
  Eye.turnEye();
}

export default Eye;
