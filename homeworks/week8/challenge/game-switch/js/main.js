const request = new XMLHttpRequest();
const gameRequest = new XMLHttpRequest();
let offset = 0;
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
  document.querySelector('.games').append(item);
}

gameRequest.onload = () => {
  if (gameRequest.status >= 200 && gameRequest.status < 400) {
    const result = JSON.parse(gameRequest.responseText);
    console.log(result);
    result.top.forEach((game) => {
      const item = document.createElement('li');
      item.innerHTML = game.game.name;
      document.querySelector('nav ul').append(item);
    });
  } else {
    console.log('err');
  }
};

request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    const result = JSON.parse(request.responseText);
    console.log(result);
    result.streams.forEach((stream) => {
      showGameItem(stream.preview.medium, stream.channel.logo,
        stream.channel.status, stream.channel.display_name, stream.channel.url);
    });
  } else {
    console.log('err');
  }
};
const url = 'https://api.twitch.tv/kraken/streams/';
request.open('GET', `${url}?game=League%20of%20Legends&limit=20`, true);
request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
request.setRequestHeader('Client-ID', 'rck45srex8b3czarkdyskohf45o1fl');
request.send();

gameRequest.open('GET', 'https://api.twitch.tv/kraken/games/top?limit=5', true);
gameRequest.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
gameRequest.setRequestHeader('Client-ID', 'rck45srex8b3czarkdyskohf45o1fl');
gameRequest.send();

document.querySelector('.btn').onclick = () => {
  offset += 20;
  request.open('GET', `${url}?game=League%20of%20Legends&limit=20&offset=${offset}`, true);
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', 'rck45srex8b3czarkdyskohf45o1fl');
  request.send();
};

document.querySelector('nav ul').addEventListener('click', (e) => {
  console.log(e.target.innerText);
  if (e.target.innerText) {
    document.querySelector('body').removeChild(document.querySelector('.games'));
    const ls = document.createElement('ul');
    document.querySelector('body').append(ls);
    ls.className = 'games';
    request.open('GET', `${url}?game=${e.target.innerText.replace(' ', '%20')}&limit=20`, true);
    console.log(`${url}?game=${e.target.innerText.replace(' ', '%20')}&limit=20`);
    request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
    request.setRequestHeader('Client-ID', 'rck45srex8b3czarkdyskohf45o1fl');
    request.send();
  }
});
