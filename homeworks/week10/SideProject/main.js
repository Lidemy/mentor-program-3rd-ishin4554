function dq(selector) {
  return document.querySelector(selector);
}

class Parser {
  constructor(dataset) {
    this.dataset = dataset;
  }

  getByDate(min, max) {
    const result = this.dataset.filter(d => Number(d[1]) >= min && Number(d[1]) <= max);
    return new Parser(result);
  }

  getByCategory(cat) {
    const result = this.dataset.filter(d => d[2] === cat);
    return new Parser(result);
  }

  getSum() {
    let hour = 0;
    let minute = 0;
    this.dataset.forEach(d => hour += Number(d[5].split(':')[0]));
    this.dataset.forEach(d => minute += Number(d[5].split(':')[1]));
    return { hour: hour + Math.floor(minute / 60), minute: minute % 60 };
  }

  getAverage(unit = 1) {
    const time = this.getSum();
    return time.hour / 43 * unit;
  }
}

function analysisResult(parser) {
  const obj = {
    total: parser.getSum().hour,
    daily: parser.getAverage(1).toFixed(2),
    weekly: parser.getAverage(7).toFixed(2),
  };
  return obj;
}

function showDashboard(result) {
  const liItem = document.createElement('li');
  liItem.className = 'result__total';
  liItem.innerHTML = `
    <div>${result.total}</div>
    <div>${result.daily}</div>
    <div>${result.weekly}</div>
  `;
  dq('.dashboard__result').append(liItem);
}
function showNumbers(parser) {
  const min = Number(dq('[name="date_min"]').value);
  const max = Number(dq('[name="date_max"]').value);
  const cat = dq('[name="category"]').value;
  dq('.dashboard__result').innerHTML = '';
  showDashboard(analysisResult(parser));
  showDashboard(analysisResult(parser.getByCategory(cat)));
  if (min && max) {
    showDashboard(analysisResult(parser.getByDate(min, max)));
    showDashboard(analysisResult(parser.getByCategory(cat).getByDate(min, max)));
  }
}

function showResult(query) {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1hYNAOOTseDPo73Paqw_JYDaFlauzy-zS7l5TUwtzdPc',
    range: query,
  }).then((response) => {
    const data = response.result.values;
    data.shift();
    const parser = new Parser(data);
    showNumbers(parser);
  });
}

document.querySelector('.btn').onclick = () => {
  showResult('A:F');
};
