function showSalary(users, age) {
  return users.filter(x => x.age <= age)
  .map(x => `${x.name}, ${x.balance}`)
  .join('\n');
}
