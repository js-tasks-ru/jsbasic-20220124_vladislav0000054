function makeFriendsList(friends) {
  let html = document.createElement('ul');

  for (const friend of friends) {
    let child = document.createElement('li');
    child.innerHTML = `${friend.firstName} ${friend.lastName}`;

    html.appendChild(child);
  }

  return html;
}
