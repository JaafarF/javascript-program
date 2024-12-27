function getUsers() {
  const usersInStorage = localStorage.getItem('users');
  const users = usersInStorage ? JSON.parse(usersInStorage) : [];
  return users;
}

function existUserByEmail(user) {
  const users = getUsers();
  return users.some(existingUser => existingUser.email === user.email);
}

function isCorrectPassword(user) {
  const users = getUsers();
  const storedUser = users.filter((su) => su.email === user.email)[0];
  console.log(storedUser);
  console.log(user);
  
  console.log(storedUser);
  return storedUser.password == user.password;
}

function addUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

export { existUserByEmail, addUser, isCorrectPassword }