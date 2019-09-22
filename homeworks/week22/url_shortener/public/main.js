const form = document.querySelector('form');
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const input = document.querySelector('input[type="text"]');
  fetch('/add', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: input.value,
    }),
  })
    .then(response => response.json())
    .then((data) => {
      document.querySelector('.result').innerText = `${location.origin}/${data.short_id}`;
    })
    .catch(console.error);
});
