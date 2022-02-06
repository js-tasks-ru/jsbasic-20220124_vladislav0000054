function toggleText() {
  let toggleButton = document.querySelector('.toggle-text-button');
  
  toggleButton.addEventListener('click', (event) => {
    let textDiv = event.target.nextElementSibling;
    textDiv.hidden = !textDiv.hidden;
  });
}