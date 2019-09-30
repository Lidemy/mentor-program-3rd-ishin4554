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
  bounceEyeY : () => {
    cursor.style.transform=`translate(${posX}px, ${posY}px) scale(1.2, 1.8)`
  },
  bounceEyeX : () => {
    cursor.style.transform=`translate(${posX}px, ${posY}px) scale(1.8, 1.2)`
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
  }
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
  if(posY < 30 || posY > document.body.scrollHeight - 45) {
    Eye.bounceEyeX();
  }
  if(posX < 30 || posX > document.body.scrollWidth - 45) {
    Eye.bounceEyeY();
  } 
}

export default Eye;
