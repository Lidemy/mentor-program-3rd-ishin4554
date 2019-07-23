function dq(selector) {
  return document.querySelector(selector);
}

function testJSON(testStr) {
  try {
    JSON.parse(testStr);
  } catch (e) {
    console.log(e);
  }
}

class GameRequest extends XMLHttpRequest {
  constructor() {
    super();
    this.url = 'https://api.twitch.tv/kraken';
    this.authorization = 'rck45srex8b3czarkdyskohf45o1fl';
  }

  settingHead() {
    super.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
    super.setRequestHeader('Client-ID', this.authorization);
    super.send();
  }

  getStreams(offset = 0, game = 'League%20of%20Legends', limit = 20) {
    dq('.games__list').setAttribute('data-value', game);
    super.open('GET', `${this.url}/streams/?offset=${offset}&game=${game}&limit=${limit}`, true);
    this.settingHead();
  }

  getGames(limit = 5) {
    super.open('GET', `${this.url}/games/top?limit=${limit}`, true);
    this.settingHead();
  }

  searchGame(query) {
    super.open('GET', `${this.url}/search/games?query=${query}`, true);
    this.settingHead();
  }
}

const streamReq = new GameRequest();
const gameReq = new GameRequest();
const searchReq = new GameRequest();
let offset = 0;

function initPage(gameQuery) {
  dq('.games__list').innerHTML = '';
  dq('.games__list').setAttribute('data-value', gameQuery);
  offset = 0;
}

streamReq.getStreams();
gameReq.getGames();

function showGameItem(obj) {
  const item = document.createElement('li');
  item.innerHTML = `
    <div class="top">
      <a href="${obj.url}" target="_blank"><img src="${obj.cover}" /></a>
    </div>
    <div class="bot">
      <img src="${obj.avatar}" />
      <div class="info">
        <h4>${obj.title}</h4>
        <p>${obj.name}</p>
      </div>
    </div>
  `;
  dq('.games__list').append(item);
}

gameReq.onload = () => {
  if (gameReq.status >= 200 && gameReq.status < 400) {
    const result = JSON.parse(gameReq.responseText);
    testJSON(result);
    result.top.forEach((game) => {
      const item = document.createElement('li');
      item.innerHTML = game.game.name;
      document.querySelector('nav ul').append(item);
    });
  } else {
    console.log('err');
  }
};

streamReq.onload = () => {
  if (streamReq.status >= 200 && streamReq.status < 400) {
    const result = JSON.parse(streamReq.responseText);
    testJSON(result);
    result.streams.forEach((stream) => {
      const obj = {
        cover: stream.preview.medium,
        avatar: stream.channel.logo,
        title: stream.channel.status,
        name: stream.channel.display_name,
        url: stream.channel.url,
      };
      showGameItem(obj);
    });
  } else {
    console.log('err');
  }
};

searchReq.onload = () => {
  if (searchReq.status >= 200 && searchReq.status < 400) {
    const result = JSON.parse(searchReq.responseText);
    testJSON(result);
    dq('.search input').value = result.games ? result.games[0].name : 'No Keywords QQ';
  } else {
    console.log('err');
  }
};

dq('nav ul').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const gameQuery = e.target.innerText.replace(' ', '%20');
    initPage(gameQuery);
    streamReq.getStreams(offset, gameQuery);
  }
});

dq('.search__btn').addEventListener('click', () => {
  const gameQuery = dq('.search input').value.replace(' ', '%20');
  initPage(gameQuery);
  streamReq.getStreams(offset, gameQuery);
});

document.addEventListener('scroll', () => {
  const lastOffset = dq('li:last-child').offsetTop + dq('li:last-child').clientHeight;
  if (window.pageYOffset + window.innerHeight > lastOffset - 10) {
    offset += 20;
    streamReq.getStreams(offset, dq('.games__list').getAttribute('data-value'));
  }
});

dq('.search input').addEventListener('keydown', (e) => {
  dq('.search input').style.color = '#e2e2e2';
  if (dq('.search input').value.length >= 3 && e.key !== 'Backspace') {
    dq('.search input').style.color = '#000';
    searchReq.searchGame(dq('.search input').value);
  }
});
