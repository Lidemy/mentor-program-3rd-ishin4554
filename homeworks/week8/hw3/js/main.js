const request = new XMLHttpRequest();
let offset = 0;
function createListItem(cover, avatar, title, name, url) {
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
  document.querySelector('ul').append(item);
}
request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    const result = JSON.parse(request.responseText);
    console.log(result);
    result.streams.forEach((stream) => {
      createListItem(stream.preview.medium, stream.channel.logo,
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

document.querySelector('.btn').onclick = () => {
  offset += 20;
  request.open('GET', `${url}?game=League%20of%20Legends&limit=20&offset=${offset}`, true);
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', 'rck45srex8b3czarkdyskohf45o1fl');
  request.send();
};
