const request = new XMLHttpRequest();
const gameRequest = new XMLHttpRequest();
let offset = 0;
// Show stram item on the site
function showGameItem(cover, avatar, title, name, url) {
  const item = document.createElement('li');
  item.innerHTML = `
    <div class="top">
    <a href="${url}" target="_blank"><img src="${cover}" /></a>
    </div>
    <div class="bot">
      <img src="${avatar}" />
      <div class="info">
        <h4>${title}</h4>
        <p>${name}</p>
      </div>
    </div>
  `;
  document.querySelector('.games__list').append(item);
}
// Get the top five games
gameRequest.onload = () => {
  if (gameRequest.status >= 200 && gameRequest.status < 400) {
    const result = JSON.parse(gameRequest.responseText);
    result.top.forEach((game) => {
      const item = document.createElement('li');
      item.innerHTML = game.game.name;
      document.querySelector('nav ul').append(item);
    });
  } else {
    console.log('err');
  }
};
// Get the top streams
request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    const result = JSON.parse(request.responseText);
    result.streams.forEach((stream) => {
      showGameItem(stream.preview.medium, stream.channel.logo,
        stream.channel.status, stream.channel.display_name, stream.channel.url);
    });
  } else {
    console.log('err');
  }
};
let url = '';
request.open('GET', 'https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=20', true);
request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
request.setRequestHeader('Client-ID', 'rck45srex8b3czarkdyskohf45o1fl');
request.send();

gameRequest.open('GET', 'https://api.twitch.tv/kraken/games/top?limit=5', true);
gameRequest.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
gameRequest.setRequestHeader('Client-ID', 'rck45srex8b3czarkdyskohf45o1fl');
gameRequest.send();
// Load more streams
document.querySelector('.btn').onclick = () => {
  offset += 20;
  request.open('GET', `${url}&offset=${offset}&limit=20`, true);
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', 'rck45srex8b3czarkdyskohf45o1fl');
  request.send();
};
// Change game button
document.querySelector('nav ul').addEventListener('click', (e) => {
  if (e.target.innerText) {
    document.querySelector('.games').removeChild(document.querySelector('.games__list'));
    const ls = document.createElement('ul');
    document.querySelector('.games').append(ls);
    ls.className = 'games__list';
    url = `https://api.twitch.tv/kraken/streams/?game=${e.target.innerText.replace(' ', '%20')}`;
    request.open('GET', `${url}&limit=20`, true);
    request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
    request.setRequestHeader('Client-ID', 'rck45srex8b3czarkdyskohf45o1fl');
    request.send();
    offset = 0;
  }
});
