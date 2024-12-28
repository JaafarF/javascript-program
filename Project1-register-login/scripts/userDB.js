function getUsers() {
  const usersInStorage = localStorage.getItem('users');
  return usersInStorage ? JSON.parse(usersInStorage) : [];
}

function existUserByEmail(user) {
  const users = getUsers();
  return users.some(existingUser => existingUser.email === user.email);
}

function getUser(email) {
  const users = getUsers();
  return users.find(user => user.email == email);
}

function isCorrectPassword(user) {
  const storedUser = getUser(user.email);
  return storedUser.password == user.password;
}

function addUser(user) {
  const users = getUsers();
  users.push({...user, 'loginCounter': 0, lockingDate: null});
  localStorage.setItem('users', JSON.stringify(users));
}

function isUserAccountLocked(user) {
  const storedUser = getUser(user.email);
  const lockingDate = new Date(storedUser.lockingDate);
  const currentDate = new Date();
  console.log(lockingDate && (lockingDate instanceof Date) && (lockingDate > currentDate));
  return (lockingDate && (lockingDate instanceof Date) && (lockingDate > currentDate));
}

function lockUserAccount(user) {
  const users = getUsers();
  const storedUser = users.find((u) => u.email == user.email);
  storedUser.lockingDate = addMinutes(new Date(), 1);
  localStorage.setItem('users', JSON.stringify(users));
}

function resetLoginCounter(user) {
  const users = getUsers();
  const storedUser = users.find((u) => u.email == user.email);
  storedUser.loginCounter = 0;
  localStorage.setItem('users', JSON.stringify(users));
}

function incrementLoginCounter(user) {
  const users = getUsers();
  const storedUser = users.find((u) => u.email == user.email);
  storedUser.loginCounter++;
  localStorage.setItem('users', JSON.stringify(users));
  return storedUser.loginCounter; 
}

function addMinutes(dt, minutes) {
  return new Date(dt.getTime() + minutes*60000);
}
export { existUserByEmail, addUser, isCorrectPassword, incrementLoginCounter, resetLoginCounter, lockUserAccount, isUserAccountLocked }