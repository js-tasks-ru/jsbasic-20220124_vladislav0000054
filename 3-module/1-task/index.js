function namify(users) {
  let usersNames = [];

 for (let user of users) {
  usersNames.push(user.name);
 }

 return usersNames;
}
