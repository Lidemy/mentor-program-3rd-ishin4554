/* eslint-env jquery */

function getSessionID() {
  const name = 'sessionID=';
  const cookies = document.cookie.split(';');
  let sessionID = '';
  cookies.forEach((cookie) => {
    if (cookie.match(name)) {
      sessionID = cookie.substring(name.length, 64);
    }
  });
  return sessionID;
}

function appendPage() {
  fetch('./users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Auth: getSessionID(),
    },
  }).then(res => res.text())
    .then((text) => {
      const data = JSON.parse(text);
      if (data.type === 'success') {
        $('.list-group').html('');
        data.users.forEach((user) => {
          if (user.permission !== 'super admin') {
            $('.list-group').append(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
              ${user.nickname}
              <a href="#" class="badge badge-primary" data-user="${user.user_id}">${user.permission}</a>
            </li>
            `);
          } else {
            $('.list-group').append(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
              ${user.nickname}
              <a href="#" class="badge badge-secondary">${user.permission}</a>
            </li>
            `);
          }
        });
        $('.navbar-nav').html('').append(`
          <li class="nav-item">
            <a class="nav-link" href="index.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link logout__link" href="#">Logout</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./backstage">Backstage</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./permission">Permission</a>
          </li>
        `);
      }
    });
}

$('.list-group').ready(() => {
  appendPage();
});

$('.list-group').on('click', (evt) => {
  if ($(evt.target).hasClass('badge-primary')) {
    evt.preventDefault();
    const userID = $(evt.target).attr('data-user');
    fetch(`user/${userID}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Auth: getSessionID(),
      },
    }).then(res => res.text())
      .then((text) => {
        const data = JSON.parse(text);
        if (data.type === 'success') {
          appendPage();
        }
      });
  }
});
