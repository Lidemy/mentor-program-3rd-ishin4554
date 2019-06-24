/* eslint-env jquery */
$('.register__submit').on('click', (evt) => {
  evt.preventDefault();
  const info = {
    username: $('#username').val(),
    password: $('#password').val(),
    nickname: $('#nickname').val(),
  };
  fetch('./users', {
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
        if (data.type === 'success') {
          window.location.href = './login';
        } else {
          alert('帳號已註冊或有錯誤資訊');
        }
      } catch (err) {
        console.log(text);
        console.log(err);
      }
    });
});
