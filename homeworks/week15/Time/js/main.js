/* eslint-disable no-undef */

function dateDuration(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function dataWrangle(data, start, end, goal) {
  const nestData = d3.nest().key(d => d.fields.date)
    .rollup(col => d3.sum(col, d => d.fields.time))
    .entries(data);
  const goalDuration = dateDuration(start, end) - 2;
  const goalSetting = goal * 60 * 60;
  const totalGoal = goalDuration * goalSetting;
  const actualDuration = dateDuration(nestData[0].key, nestData[nestData.length - 1].key);
  const total = d3.sum(nestData, d => d.value);
  const lastTotal = totalGoal - total;
  const lastDays = goalDuration - actualDuration;
  const lastAverage = lastTotal / lastDays;
  const nowAverage = total / actualDuration;
  const dataset = {
    days: nestData,
    properties: {
      goalDuration,
      goalSetting,
      totalGoal,
      actualDuration,
      total,
      lastTotal,
      lastDays,
      lastAverage,
      nowAverage,
    },
  };
  return dataset;
}

function addText(svg, xScale, yScale, xMax, yPos, color) {
  svg.append('line')
    .attr('x1', xScale(0))
    .attr('y1', yScale(yPos / 3600))
    .attr('x2', xScale(xMax))
    .attr('y2', yScale(yPos / 3600))
    .attr('transform', 'translate(0, 30)')
    .attr('stroke', color)
    .attr('stroke-width', '2')
    .attr('data-value', `${yPos / 3600}`);
}

function generateDashboard(dataset, container) {
  $(`${container} .days`).text(dataset.properties.actualDuration);
  $(`${container} .average__time`).text((dataset.properties.total / dataset.properties.actualDuration / 3600).toFixed(2));
  $(`${container} .last__days`).text(dataset.properties.lastDays);
  $(`${container} .last__time`).text((dataset.properties.lastTotal / 3600).toFixed(2));
  $(`${container} .last__averagetime`).text((dataset.properties.lastAverage / 3600).toFixed(2));
}

function generateGraph(dataset) {
  $('.graph').html('');
  const margin = 30;
  const height = $('.graph').height();
  const width = $('.graph').width();
  const xMax = dataset.days.length;
  const xScale = d3.scaleLinear()
    .domain([0, xMax])
    .range([0, width]);
  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset.days, d => d.value / 3600))
    .range([height - margin * 2, 0]);
  const line = d3.line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d.value / 3600));
  const svg = d3.select('.graph').append('svg')
    .attr('width', width)
    .attr('height', height);
  const yAxis = d3.axisRight(yScale).tickSize(width);
  addText(svg, xScale, yScale, xMax, dataset.properties.goalSetting, '#2B2B61', '目標時數');
  addText(svg, xScale, yScale, xMax, dataset.properties.nowAverage, '#D44F60', '現在平均');
  svg.append('g').call(yAxis)
    .attr('transform', `translate(-5, ${margin})`)
    .attr('stroke-dasharray', '5,2')
    .selectAll('text')
    .attr('x', 15);
  svg.append('path')
    .datum(dataset.days)
    .attr('class', 'line')
    .attr('d', line)
    .attr('transform', `translate(30, ${margin})`);
  svg.selectAll('.dot')
    .data(dataset.days)
    .enter().append('circle')
    .attr('class', (d) => {
      if (d.value / 3600 > dataset.properties.goalSetting / 3600) {
        return 'dot upper';
      }
      return 'dot lower';
    })
    .attr('cx', (d, i) => xScale(i))
    .attr('cy', d => yScale(d.value / 3600))
    .attr('r', 5)
    .attr('transform', `translate(30, ${margin})`)
    .on('mouseover', (d) => {
      $('.date').text(d.key);
      $('.nowTime').text((d.value / 3600).toFixed(2));
      $('.loseTime').text((d.value / 3600 - dataset.properties.goalSetting / 3600).toFixed(2));
      $('.goalTime').text((dataset.properties.goalSetting / 3600).toFixed(2));
    });
}


const key = new URLSearchParams(window.location.search);
$('.date__submit').on('click', (evt) => {
  evt.preventDefault();
  const goal = $('.date__goal').val();
  const start = $('.date__start').val();
  const end = $('.date__end').val();
  fetch(`https://api.airtable.com/v0/${key.get('base')}/Table%201?api_key=${key.get('key')}&filterByFormula=AND(IS_AFTER({date}, '${start}'), IS_BEFORE({date}, '${end}'))&sort%5B0%5D%5Bfield%5D=date&sort%5B0%5D%5Bdirection%5D=asc`)
    .then(res => res.text())
    .then((text) => {
      const data = JSON.parse(text);
      const dataset = dataWrangle(data.records, start, end, goal);
      generateDashboard(dataset, '.range');
      generateGraph(dataset);
    });
});

$('.btn__total').on('click', () => {
  fetch(`https://api.airtable.com/v0/appk4mlIKinCphURC/Table%202?api_key=${key.get('key')}&fields[]=sum&fields[]=max&fields[]=min`)
    .then(res => res.text())
    .then((text) => {
      const data = JSON.parse(text);
      const info = data.records[0].fields;
      const len = dateDuration(info.min, info.max);
      console.log(info);
      $('.days').text(len);
      $('.total__time').text((info.sum / 3600).toFixed(2));
      $('.average__time').text((info.sum / len / 3600).toFixed(2));
    });
});

$('.home').click(() => {
  window.location = 'index.html';
});
