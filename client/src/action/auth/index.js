export const USER_LOGIN = 'USER_LOGIN';
export const userLogin = auth => ({
  type: USER_LOGIN,
  auth,
});

export const USER_LOGOUT = 'USER_LOGOUT';
export const userLogout = () => ({
  type: USER_LOGOUT
});

