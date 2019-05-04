const textElements = document.querySelectorAll('.must input[type="text"]');
const emailElement = document.querySelector('.must input[type="email"]');
const radioElement = document.querySelector('.must .radio');

function alertText(node, text) {
  const item = document.createElement('p');
  item.innerHTML = text;
  item.classList.add('text-highlight');
  node.parentNode.append(item);
}

textElements.forEach((element) => {
  element.addEventListener('focusout', () => {
    if (!element.value) {
      element.parentNode.classList.add('highlight');
      if (!element.parentNode.querySelector('p')) {
        alertText(element, '這是必填問題');
      }
    } else {
      element.parentNode.classList.remove('highlight');
      element.parentNode.removeChild(element.parentNode.querySelector('p'));
    }
  });
});

emailElement.addEventListener('focusout', () => {
  if (!emailElement.value.match(/\w+@\w+.\w+/)) {
    emailElement.parentNode.classList.add('highlight');
    if (!emailElement.parentNode.querySelector('p')) {
      alertText(emailElement, '請輸入正確的 email');
    }
  } else {
    emailElement.parentNode.classList.remove('highlight');
    emailElement.parentNode.removeChild(emailElement.parentNode.querySelector('p'));
  }
});

radioElement.addEventListener('focusout', () => {
  if (!radioElement.querySelector('input[type="radio"]:checked')) {
    console.log('test');
  }
});
