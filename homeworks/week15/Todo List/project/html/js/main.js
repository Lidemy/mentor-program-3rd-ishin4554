/* eslint-disable no-undef */

let dataset = {};
let isChoose = false;

function refreshPage(func) {
  // GET
  fetch('task.php', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(res => res.text())
    .then((text) => {
      raw = JSON.parse(text);
      dataset = {
        nodes: [],
        links: [],
      };
      console.log(raw);

      raw.forEach((doc) => {
        dataset.nodes.push(
          {
            id: doc.id,
            name: doc.name,
            url: doc.url,
            author: doc.author,
            is_done: doc.is_done,
          },
        );
        doc.links.forEach((link) => {
          dataset.links.push(
            {
              source: doc.name,
              target: link,
            },
          );
        });
      });
      console.log(dataset);
      func(dataset);
    });
}

function generateList(dataset) {
  $('.graph').html('');
  dataset.nodes.forEach((node) => {
    $('body').append(`<p>${node.name}</p>`);
  });
}

function generateGraph(dataset) {
  const width = 1440;
  const height = 720;
  const { nodes } = dataset;
  const { links } = dataset;

  const svg = d3.select('.graph')
    .attr('width', width)
    .attr('height', height);

  const link = svg.selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .style('stroke', 'grey');

  const node = svg.selectAll('rect')
    .data(nodes)
    .enter()
    .append('rect')
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', (d) => {
      if (d.is_done) {
        return 'black';
      }
      return '#69b3a2';
    })
    .on('click', (d) => {
      if (isChoose) {
        let now = $('input[name="links"]').val();
        now += `${d.name},`;
        $('input[name="links"]').val(now);
      } else {
        // PATCH
        fetch('task.php', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: d.name,
            is_done: !d.is_done,
          }),
        }).then(res => res.text())
          .then(text => refreshPage(generateGraph));
      }
    });

  const text = svg.selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
    .text(d => d.name);

  function ticked() {
    node
      .attr('x', d => d.x - 10)
      .attr('y', d => d.y - 10);

    text
      .attr('x', d => d.x)
      .attr('y', d => d.y);

    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
  }

  const simulationLayout = d3.forceSimulation(nodes)
    .force('charge', d3.forceCollide().radius(d => 50))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('r', d3.forceRadial(300, width / 2, height / 2))
    .on('tick', ticked);

  links.forEach((link) => {
    const source = nodes.filter(node => node.name === link.source);
    const target = nodes.filter(node => node.name === link.target);
    link.source = source[0].index;
    link.target = target[0].index;
  });

  simulationLayout.force('link', d3.forceLink(links));
}

$(document).ready(() => {
  refreshPage(generateGraph);
});

$('.swtich__state').on('click', () => {
  isChoose = !isChoose;
  $('.swtich__state').toggleClass('tag');
});

$('body').on('keypress', (evt) => {
  if (evt.key === 'l') {
    refreshPage(generateList);
  }
  if (evt.key === 'g') {
    refreshPage(generateGraph);
  }
  if (evt.key === 'Enter') {
    const author = $('input[name="author"]').val();
    const name = $('input[name="name"]').val();
    const url = $('input[name="url"]').val();
    const relation = $('input[name="links"]').val();
    const relationArr = relation.split(',');
    relationArr.pop();

    // POST
    fetch('task.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        author,
        name,
        url,
        links: relationArr,
        is_done: false,
      }),
    }).then(() => {
      refreshPage(generateGraph);
    });
  }
});
