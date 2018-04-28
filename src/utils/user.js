export const saveUserLocal = userData =>
  localStorage.setItem('user', JSON.stringify(userData));

export const saveUserSession = userData =>
  sessionStorage.setItem('user', JSON.stringify(userData));

export const removeUser = () => {
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
};

export const getUser = () => {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  if (user !== undefined) {
    return JSON.parse(user);
  } else {
    return null;
  }
};
