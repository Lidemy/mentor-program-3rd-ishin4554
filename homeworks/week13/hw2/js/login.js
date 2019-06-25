/* eslint-env jquery */

$('.login__submit').on('click', (evt) => {
  evt.preventDefault();
  const info = {
    username: $('#username').val(),
    password: $('#password').val(),
  };
  fetch('./php/handle_login.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(info),
    mode: 'cors',
  }).then(res => res.text())
    .then((text) => {
      try {
        const data = JSON.parse(text);
        if (data.type === 'Unauthorized') {
          alert('輸入錯誤帳號或密碼');
        }
        if (data.type === 'success') {
          console.log(data.session);
          const date = new Date();
          date.setTime(date.getTime() + 300000);
          document.cookie = `sessionID=${data.session}; expires=${date.toUTCString()}`;
          window.location.href = './index.html';
        }
      } catch (err) {
        console.log(text);
        console.log(err);
      }
    });
});
