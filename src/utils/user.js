export const saveUserLocal = userData =>
  localStorage.setItem('user', JSON.stringify(userData));

export const saveUserSession = userData =>
  sessionStorage.setItem('user', JSON.stringify(userData));

export const removeUser = () => {
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
};

export const getUser = () =>
  localStorage.getItem('user') || sessionStorage.getItem('user') || {};
