import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import builderReducer from './builder';
import toolsReducer from './builder/tools';
import resumeReducer from './builder/resume';
import authReducer from './auth'



const rootReducer = (history) => combineReducers({
  builder: builderReducer,
  tools: toolsReducer,
  resume: resumeReducer,
  auth: authReducer,
  router: connectRouter(history)
});

export default rootReducer;