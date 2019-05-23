let isChecked = true;
const warningClass = 'warning--text';

// Hadling nodes
function dq(selector) {
  return document.querySelector(selector);
}
function removeElement(node, selector) {
  node.parentNode.removeChild(node.parentNode.querySelector(selector));
}

// UI element
function addBg(targetNode) {
  targetNode.parentNode.classList.add('highlight');
}
function removeBg(targetNode) {
  targetNode.parentNode.classList.remove('highlight');
}
function addText(targetNode, text) {
  const item = document.createElement('p');
  item.innerHTML = text;
  item.className = warningClass;
  targetNode.parentNode.append(item);
}
function removeText(targetNode) {
  removeElement(targetNode, `.${warningClass}`);
}

// Check input
function checkNodeExist(node, selector) {
  return node.parentNode.querySelector(selector);
}
function toggleText(targetNode, condition, text) {
  if (!condition) {
    if (checkNodeExist(targetNode, `.${warningClass}`)) {
      removeText(targetNode);
    }
    addText(targetNode, text);
    addBg(targetNode);
    isChecked = false;
  } else if (checkNodeExist(targetNode, `.${warningClass}`)) {
    removeText(targetNode);
    removeBg(targetNode);
  }
}

// Check functions
function checkNode(node) {
  const inputType = node.getAttribute('type');
  if (inputType === 'text') {
    toggleText(node, node.value, '請輸入文字');
  }
  if (inputType === 'email') {
    toggleText(node, node.value.match(/\w+@\w+.\w+/), '請輸入正確的 email');
  }
  if (inputType === 'radio') {
    toggleText(node, dq('[name="class"]:checked'), '此為必填問題');
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
