import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// Effect 
let posX;
let posY;

function correct() {
  $('.cursor').css({ transform: `translateX(${posX}px) translateY(${posY}px)` });
}
function moving(evt) {
  posX = evt.pageX;
  posY = evt.pageY;
  window.requestAnimationFrame(correct);
}

$('body').on('mouseover', (evt) => {
  $('.cursor').css('transform', `translate(${evt.clientX}px,${evt.clientY}px)`);
});

$('html').mousemove(moving);

