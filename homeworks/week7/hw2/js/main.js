const textElements = document.querySelectorAll('.must input[type="text"]');
const emailElement = document.querySelector('.must input[type="email"]');
const radioElement = document.querySelectorAll('.must [name="class"]');
let state = false;

function showText(node, text) {
  const item = document.createElement('p');
  item.innerHTML = text;
  item.classList.add('text-highlight');
  node.parentNode.append(item);
}
function removeText(node) {
  node.parentNode.classList.remove('highlight');
  const temp = node.parentNode.querySelector('p');
  node.parentNode.removeChild(temp);
}

function checkFinal() {
  const event = new Event('focusout');
  textElements.forEach((element) => {
    element.dispatchEvent(event);
  });
  radioElement.forEach((element) => {
    element.dispatchEvent(event);
  });
  emailElement.dispatchEvent(event);
}

textElements.forEach((element) => {
  element.addEventListener('focusout', () => {
    if (!element.value) {
      element.parentNode.classList.add('highlight');
      if (!element.parentNode.querySelector('p')) {
        showText(element, '這是必填問題');
      }
      state = false;
    } else if (element.parentNode.querySelector('p')) {
      removeText(element);
      state = true;
    }
  });
});

emailElement.addEventListener('focusout', () => {
  if (!emailElement.value.match(/\w+@\w+.\w+/)) {
    emailElement.parentNode.classList.add('highlight');
    if (!emailElement.parentNode.querySelector('p')) {
      showText(emailElement, '請輸入正確的 email');
    }
    state = false;
  } else if (emailElement.parentNode.querySelector('p')) {
    removeText(emailElement);
    state = true;
  }
});

radioElement.forEach((element) => {
  element.addEventListener('focusout', () => {
    if (!element.checked) {
      element.parentNode.parentNode.classList.add('highlight');
      if (!element.parentNode.querySelector('p')) {
        showText(element, '這是必填問題');
      }
      state = false;
    } else if (element.parentNode.querySelector('p')) {
      element.parentNode.parentNode.classList.remove('highlight');
      const temp = element.parentNode.querySelector('p');
      element.parentNode.removeChild(temp);
      state = true;
    }
  });
});

document.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault();
  checkFinal();
  if (state === false) {
    alert('提交失敗');
  } else {
    const obj = {
      email: document.querySelector('[name="email"]').value,
      name: document.querySelector('[name="email"]').value,
      job: document.querySelector('[name="job"]').value,
      how: document.querySelector('[name="how"]').value,
      class: document.querySelector('[name="class"]:checked').value,
      background: document.querySelector('[name="background"]').value,
      other: document.querySelector('[name="other"]').value,
    };
    alert('提交成功');
    console.log(obj);
  }
});
