import {
  NEW_RESUME,
  UPDATE_RESUME,
} from '../../../action/builder';
import Resume from '../../../resume-data';

//const storedResume = loadResume();
const initialState = {
  ...Resume,
};

const newResume = () => ({ ...Resume });

const updateResume = (state, action) => {
  var resume = action.resume;
  ['education', 'experience'].forEach(function (section, index) {
    resume[section].forEach(function (item, index) {
      ['startDate', 'endDate'].forEach(function (col, index) {
        if (item[col] && item[col].$date) {
          item[col] = new Date(parseInt(item[col].$date))
        }
      })
    })
  })
  //saveResume(action.resume);
  return {
    ...state,
    ...resume,
  };
};

export default (state = /*storedResume || */initialState, action) => {
  switch (action.type) {
    case NEW_RESUME:
      return newResume(state);
    case UPDATE_RESUME:
      return updateResume(state, action);
    default:
      return state;
  }
};
