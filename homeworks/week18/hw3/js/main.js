/* eslint-env jquery */

function render(tasks) {
  $('.board__list').html('');
  tasks.forEach((task) => {
    let ele = '';
    if (task.is_achieved) {
      ele = `
      <li data-value='${task._id.$oid}' class="board__task list-group-item list-group-item-action">
        <span class='task__title'>${task.title}</span>
        <a href="${task.url}" target='_blank' class="task__btn badge badge-secondary">點開閱讀</a>
        <span class="task__delete badge badge-danger">刪除</span>
      </li>
    `;
    } else {
      ele = `
      <li data-value='${task._id.$oid}' class="board__task list-group-item list-group-item-action">
        <span class='task__title'>${task.title}</span>
        <span target='_blank' class="task__btn badge badge-success">取消已讀</span>
        <span class="task__delete badge badge-danger">刪除</span>
      </li>
    `;
    }
    $('.board__list').append(ele);
  });
}

function generateList(tasks) {
  const dataset = {
    nodes: [],
    links: [],
  };
  tasks.forEach((task) => {
    dataset.nodes.push({
      id: task._id.$oid,
      title: task.title,
      url: task.url,
      weight: task.tags.length,
    });
    task.tags.forEach((tag) => {
      dataset.links.push({
        source: task._id.$oid,
        target: tag,
      })
    })
  });
  return dataset;
}

function readTask() {
  fetch('./task.php', {
    method: 'GET',
  })
    .then(res => res.text())
    .then(text => JSON.parse(text))
    .then((data) => {
      render(data.tasks);
      const dataset = generateList(data.tasks);
      console.log(dataset);
      generateGraph(dataset);
    });
}

function createTask(tags) {
  fetch('./task.php', {
    method: 'POST',
    body: JSON.stringify({
      title: $('input[name="title"]').val(),
      url: $('input[name="url"]').val(),
      tags,
    }),
  })
    .then(res => res.text())
    .then((text) => {
      console.log(text);
      $('input[name="title"]').val('');
      $('input[name="url"]').val();
      readTask();
    });
}
function deleteTask(node) {
  fetch(`./task.php?id=${node.attr('data-value')}`, {
    method: 'DELETE',
  })
    .then(res => res.text())
    .then((text) => {
      console.log(text);
      readTask();
    });
}
function updateTask(node) {
  fetch(`./task.php?id=${node.attr('data-value')}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: node.children('input[name="title"]').val(),
      url: node.children('input[name="url"]').val(),
    }),
  })
    .then(res => res.text())
    .then(() => {
      readTask();
    });
}

function toggleTask(node) {
  fetch(`./task.php?id=${node.attr('data-value')}`, {
    method: 'GET',
  })
    .then(res => res.text())
    .then(text => JSON.parse(text))
    .then((data) => {
      render(data.tasks);
    });
}

function generateGraph(dataset) {
  const width = $(window).width()*0.7;
  const height = $(window).height()*0.6;
  const { nodes } = dataset;
  const { links } = dataset;

  const svg = d3.select('.graph')
    .attr('width', width)
    .attr('height', height)

  const link = svg.append("g").selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr("stroke-width", .5)
    .attr("stroke","black")

  const node = svg.selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', d => 3+d.weight*3)
    .attr('fill', '#FAE343')
    .on('mouseover', (d) => {
      $(`li[data-value="${d.id}"]`).toggleClass('list__choose');
    })
    .on('mouseout', (d) => {
      $(`li[data-value="${d.id}"]`).toggleClass('list__choose');
    })
    .call(d3.drag()
      .on("start", () => {
        simulationLayout.alphaTarget(0.3).restart();
      })
      .on("drag", (d) => {
        d3.select(this).attr({
          'cx': d.x = d3.event.x,
          'cy': d.y = d3.event.y,
        }); 
      })
      .on("end", () => {
        simulationLayout.alphaTarget(0);
    }));

  const text = svg.selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
    .text(d => d.title);

  const simulationLayout = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(() => -200))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('link', d3.forceLink(links).id(d => d.id).distance(100))
    .on('tick', () => {
      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
      text
        .attr('x', d => d.x)
        .attr('y', d => d.y);
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
    });
}


$('.nav__submit').click(() => {
  const tags = [];
  $('.board__list').children('.active').each((idx, item) => {
    tags.push($(item).attr('data-value'));
  });
  createTask(tags);
});

$('.board__list').click((evt) => {
  if ($(evt.target).hasClass('task__btn')) {
    toggleTask($(evt.target).parent());
  }
  if ($(evt.target).hasClass('board__task')) {
    $('.tag__count').text();
    $(evt.target).toggleClass('active');
    $('.tag__count').text($('.board__list').children('.active').length);
  }
  if ($(evt.target).hasClass('task__delete')) {
    deleteTask($(evt.target).parent());
  }
  if ($(evt.target).hasClass('task__title')) {
    const list = $(evt.target).parent();
    list.html('');
    list.append(`
      <input type='text' name='title' placeholder='輸入修改 title'/>
      <input type='text' name='url' placeholder='輸入修改 url'/>
      </br>
      <span class="edit__submit badge badge-success">送出</span>
      <span class="edit__cancel badge badge-danger">取消</span>
    `);
  }
  if ($(evt.target).hasClass('edit__cancel')) {
    readTask();
  }
  if ($(evt.target).hasClass('edit__submit')) {
    updateTask($(evt.target).parent());
  }
});

$('input[name="tag"]').focus(() => {
  $('input[name="tag"]').attr('placeholder', '直接點擊相關任務');
});

$(document).ready(() => {
  readTask();
});
