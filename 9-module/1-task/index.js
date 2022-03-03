export default function promiseClick(button) {
  return new Promise((resolve, reject) => {
    button.onclick = event => {
      resolve(event);
    };
  });
}