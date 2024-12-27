function getUsers() {
  const usersInStorage = localStorage.getItem('users');
  const users = usersInStorage ? JSON.parse(usersInStorage) : [];
  return users;
}

function existUser(user) {
  const users = getUsers();
  return users.some(existingUser => existingUser.email === user.email);
}

function addUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

export { existUser, addUser }