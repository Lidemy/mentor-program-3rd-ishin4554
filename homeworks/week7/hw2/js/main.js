let isChecked = true;
const warningClass = 'warning--text';

class Element {
  constructor(node) {
    this.node = node;
    this.parent = this.node.parentNode;
  }

  removeElement(selector) {
    this.parent.removeChild(this.parent.querySelector(selector));
  }

  addBg() {
    this.parent.classList.add('highlight');
  }

  removeBg() {
    this.parent.classList.remove('highlight');
  }

  addText(text) {
    const item = document.createElement('p');
    item.innerHTML = text;
    item.className = warningClass;
    this.parent.append(item);
  }

  removeText() {
    this.removeElement(`.${warningClass}`);
  }

  checkNodeExist(selector) {
    return this.parent.querySelector(selector);
  }
}

class Input extends Element {
  constructor(node) {
    super(node);
    this.type = node.getAttribute('type');
  }

  toggleText(condition, text) {
    if (!condition) {
      if (super.checkNodeExist(`.${warningClass}`)) {
        super.removeText();
      }
      super.addText(text);
      super.addBg();
      isChecked = false;
    } else if (super.checkNodeExist(`.${warningClass}`)) {
      super.removeText();
      super.removeBg();
    }
  }
}

// Hadling nodes
function dq(selector) {
  return document.querySelector(selector);
}

// Check functions
function checkNode(node) {
  const input = new Input(node);
  if (input.type === 'text') {
    input.toggleText(node.value, '請輸入文字');
  }
  if (input.type === 'email') {
    input.toggleText(node.value.match(/\w+@\w+.\w+/), '請輸入正確的 email');
  }
  if (input.type === 'radio') {
    input.toggleText(dq('[name="class"]:checked'), '此為必填問題');
  }
}
function checkFinal(nodeLs) {
  nodeLs.forEach((node) => {
    checkNode(node);
  });
}
function getValue(name) {
  return dq(`[name='${name}']`).value;
}
function createObj() {
  const col = ['email', 'name', 'job', 'how', 'class', 'background', 'other'];
  const obj = {};
  col.forEach((key) => {
    obj[key] = getValue(key);
  });
  return obj;
}

// Listeners
dq('form').addEventListener('focusout', (e) => {
  const node = e.target;
  checkNode(node);
});
dq('button').addEventListener('click', (e) => {
  isChecked = true;
  e.preventDefault();
  checkFinal(document.querySelectorAll('input'));
  if (isChecked) {
    console.log(createObj());
    alert('完成填寫');
  }
});
