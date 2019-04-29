const request = require('request');
const process = require('process');


const game = process.argv[2];
const clientID = 'rck45srex8b3czarkdyskohf45o1fl';
let offset = 0;
const topList = [];

function get() {
  request.get({
    url: `https://api.twitch.tv/kraken/videos/top?limit=100&offset=${offset}&sort=views&game=${game}`,
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': clientID,
    },
  },
  (err, res, body) => {
    if (topList.length < 200) {
      const obj = JSON.parse(body);
      // 由於 API 定義底線與 ESlint 的規範衝突，所以關掉 no-underscore-dangle 的規範
      obj.vods.forEach((item) => {
        // eslint-disable-next-line no-underscore-dangle
        topList.push(`${item.title} ${item._id}`);
      });
      offset += topList.length;
      get();
      if (err) {
        console.log(`Get Data Error${err}`);
      }
    } else {
      topList.forEach(item => console.log(item));
    }
  });
}
get();
