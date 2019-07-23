/* eslint-disable no-undef */
$('.sp').click(() => {
  $('body').append(`
    <div class='login'> 
      <div class='close'>×</div>
      <h3>HI</br> 我們需要你的表單</h3>
      <label>Base</label>
      <input type='text' placeholder='URL base in api document' name='base' />
      <label>API key</label>
      <input type='text' placeholder='Api key in your account' name='key' />
      <button type='submit'> 送出 </button>
      <p>我們不會儲存你任何的資料</p>
    </div>
`);
});

$('body').on('click', '.login button', (evt) => {
  evt.preventDefault();
  window.location = `dashboard.html?key=${$('input[name="key"]').val()}&base=${$('input[name="base"]').val()}`;
});

$('body').on('mouseover', (evt) => {
  console.log(`${evt.clientX}, ${evt.clientY}`);
  $('.cursor').css('transform', `translate(${evt.clientX}px,${evt.clientY}px)`);
});

let posX;
let posY;
function moving(e) {
  posX = e.pageX;
  posY = e.pageY;
  window.requestAnimationFrame(test);
}
$('body').mousemove(moving);
$('.sp').mouseout(() => {
  $('.cursor').css({
    padding: '5px',
    transition: '0.1s',
    background: 'black',
    border: 'none',
    color: 'white',
  });
  $('.cursor').text('Explore');
});
$('.sp').mouseover(() => {
  $('.cursor').css({
    padding: '30px',
    transition: 'padding .3s',
    background: 'transparent',
    border: '2px solid #D44F60',
    color: '#D44F60',
  });
  $('.cursor').text('Click & Visualize');
});
$('.how').mouseout(() => {
  $('.cursor').css({
    padding: '5px',
    transition: '0.1s',
    background: 'black',
    border: 'none',
    color: 'white',
  });
  $('.cursor').text('Explore');
});
$('.how').mouseover(() => {
  $('.cursor').css({
    padding: '30px',
    transition: 'padding .3s',
    background: 'transparent',
    border: '2px solid #D44F60',
    color: '#D44F60',
  });
  $('.cursor').text('Click & How');
});

function test() {
  $('.cursor').css({ transform: `translateX(${posX}px) translateY(${posY}px)` });
}
