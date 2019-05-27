/* eslint-disable no-undef */
const col = {
  id: 0,
  date: 1,
  category: 2,
  description: 3,
  tag: 4,
  time: 5,
};

function dq(selector) {
  return document.querySelector(selector);
}

function transDay(day) {
  return new Date(`${day.slice(0, 4)}-${day.slice(4, 6)}-${day.slice(6, 8)}`);
}

class Filter {
  constructor(dataset) {
    this.dataset = dataset;
    this.length = this.getLen();
  }

  getByDate(min, max) {
    const result = this.dataset.filter(
      d => Number(d[col.date]) >= min && Number(d[col.date]) <= max,
    );
    return new Filter(result);
  }

  getLen() {
    const d1 = transDay(this.getCol('date')[0]);
    const d2 = transDay(this.getCol('date')[this.getCol('date').length - 1]);
    return (d2 - d1) / 86400000;
  }

  getByCategory(cat) {
    const result = this.dataset.filter(d => d[col.category] === cat);
    return new Filter(result);
  }

  getSum() {
    const timeData = this.getCol('time');
    const hour = timeData.reduce((acc, d) => acc + Number(d.split(':')[0]), 0);
    const minute = timeData.reduce((acc, d) => acc + Number(d.split(':')[1]), 0);
    return { hour: hour + Math.floor(minute / 60), minute: minute % 60 };
  }

  getAverage(unit = 1) {
    const time = this.getSum();
    return time.hour / this.length * unit;
  }

  getCol(key) {
    const arr = [];
    this.dataset.forEach(d => arr.push(d[col[key]]));
    return arr;
  }
}

function analysisResult(filter) {
  const obj = {
    len: filter.length,
    total: filter.getSum().hour,
    daily: filter.getAverage(1).toFixed(2),
    weekly: filter.getAverage(7).toFixed(2),
  };
  return obj;
}

function showDashboard(result) {
  const liItem = document.createElement('li');
  liItem.className = 'result__total';
  liItem.innerHTML = `
    <h1>${result.len}</h1>
    <div>${result.total}</div>
    <div>${result.daily}</div>
    <div>${result.weekly}</div>
  `;
  dq('.dashboard__result').append(liItem);
}
function showNumbers(filter) {
  const min = Number(dq('[name="date_min"]').value);
  const max = Number(dq('[name="date_max"]').value);
  const cat = dq('[name="category"]').value;
  dq('.dashboard__result').innerHTML = '';
  showDashboard(analysisResult(filter));
  showDashboard(analysisResult(filter.getByCategory(cat)));
  if (min && max) {
    showDashboard(analysisResult(filter.getByDate(min, max)));
    showDashboard(analysisResult(filter.getByCategory(cat).getByDate(min, max)));
  }
}

function showResult(query) {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1hYNAOOTseDPo73Paqw_JYDaFlauzy-zS7l5TUwtzdPc',
    range: query,
  }).then((response) => {
    const data = response.result.values;
    data.shift();
    const filter = new Filter(data);
    showNumbers(filter);
  });
}

document.querySelector('.btn').onclick = () => {
  showResult('A:F');
};
