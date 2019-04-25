const request = require('request');

const clientID = 'rck45srex8b3czarkdyskohf45o1fl';

request.get({
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': clientID,
  },
},
(err, res, body) => {
  const obj = JSON.parse(body);
  // 由於 API 定義底線與 ESlint 的規範衝突，所以關掉 no-underscore-dangle 的規範
  // eslint-disable-next-line no-underscore-dangle
  obj.top.forEach(item => console.log(`${item.game._id} ${item.game.name}`));
  if (err) {
    console.log(`Get Data Error${err}`);
  }
});
