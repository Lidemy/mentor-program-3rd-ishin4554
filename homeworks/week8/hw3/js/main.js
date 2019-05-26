class GameRequest extends XMLHttpRequest {
  constructor() {
    super();
    this.authorization = 'rck45srex8b3czarkdyskohf45o1fl';
  }

  getStreams(offset = 0, game = 'League%20of%20Legends', limit = 20) {
    super.open('GET', `${this.url}/streams/?offset=${offset}&game=${game}&limit=${limit}`, true);
    super.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
    super.setRequestHeader('Client-ID', this.authorization);
    super.send();
  }

  getGames(limit = 5) {
    super.open('GET', `${this.url}/games/top?limit=${limit}`, true);
    super.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
    super.setRequestHeader('Client-ID', this.authorization);
    super.send();
  }
}

function dq(selector) {
  return document.querySelector(selector);
}

const streamReq = new GameRequest();
const gameReq = new GameRequest();
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

streamReq.getStreams();
gameReq.getGames();

// Get the top five games
gameReq.onload = () => {
  if (gameReq.status >= 200 && gameReq.status < 400) {
    const result = JSON.parse(gameReq.responseText);
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
streamReq.onload = () => {
  if (streamReq.status >= 200 && streamReq.status < 400) {
    const result = JSON.parse(streamReq.responseText);
    result.streams.forEach((stream) => {
      showGameItem(stream.preview.medium, stream.channel.logo,
        stream.channel.status, stream.channel.display_name, stream.channel.url);
    });
  } else {
    console.log('err');
  }
};

// Load more streams
document.querySelector('.btn').onclick = () => {
  offset += 20;
  streamReq.getStreams(offset);
};
document.querySelector('nav ul').addEventListener('click', (e) => {
  if (e.target.innerText) {
    dq('.games').innerHTML = '';
    const ls = document.createElement('ul');
    dq('.games').append(ls);
    ls.className = 'games__list';
    offset = 0;
    streamReq.getStreams(offset, e.target.innerText.replace(' ', '%20'));
  }
});
