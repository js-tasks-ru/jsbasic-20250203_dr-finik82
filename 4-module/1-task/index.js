function makeFriendsList(friends) {
  const ul = document.createElement('ul');

  for (let i = 0; i < friends.length; i++) {
    const friend = friends[i];
    const li = document.createElement('li');
    li.textContent = friend.firstName + ' ' + friend.lastName;
    ul.appendChild(li);
  }

  return ul;
}
