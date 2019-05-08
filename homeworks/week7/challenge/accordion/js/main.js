document.querySelectorAll('.btn').forEach((element) => {
  element.addEventListener('click', () => {
    const idx = element.getAttribute('data-value');
    const content = document.querySelector(`.content[data-value='${idx}']`);
    const realHeight = content.scrollHeight;
    if (parseInt(content.style.height, 10) === realHeight) {
      content.style.height = 0;
    } else {
      document.querySelectorAll('.content').forEach((node) => {
        const contentBlock = node;
        if (parseInt(contentBlock.style.height, 10) === realHeight) {
          contentBlock.style.height = 0;
        }
      });
      content.style.height = `${realHeight}px`;
    }
  });
});
