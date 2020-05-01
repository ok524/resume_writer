const initialState = {
  isAuthenticated: false,
  token: ''
};

const storedAuth = JSON.parse(localStorage.getItem('auth'));

const userLogin = (state, action) => {
  localStorage.setItem('auth', JSON.stringify(action.auth));
  return {
    ...state,
    ...action.auth,
  };
};

const userLogout = (state, action) => {
  localStorage.setItem('auth', JSON.stringify(initialState));
  return {
    ...state,
    ...initialState
  }
}

export default (state = storedAuth || initialState, action) => {
  switch(action.type) {
    case 'USER_LOGIN':
      return userLogin(state, action);
    case 'USER_LOGOUT':
      return userLogout(state, action);
    default:
      return state;
  }
}