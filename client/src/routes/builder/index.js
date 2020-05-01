import React from 'react';
import { Router, Route } from 'react-router';
import { withRouter } from 'react-router-dom';

import Builder from '../../containers/Builder';

const BuilderRouter = ({history}) => (
  <Router history={history}>
    <Route path="/builder/:resumeId?" component={Builder}/>
  </Router>
)

export default withRouter(BuilderRouter);