import {
  TOGGLE_TOOLBAR
} from '../../action/builder';

const initialState = {
  toolbarOpen: false
};

const toggleToolbar = state => ({
  ...state,
  toolbarOpen: !state.toolbarOpen,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TOOLBAR:
      return toggleToolbar(state);
    default:
      return state;
  }
};
