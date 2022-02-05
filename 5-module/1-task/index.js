function hideSelf() {
  let button = document.querySelector('button.hide-self-button');
  button.addEventListener('click', (event) => event.currentTarget.hidden = true);
}