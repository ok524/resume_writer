import { withRouter } from 'react-router-dom';

import React from 'react';

import NavBar from '../../components/NavBar/NavBar'
import ToolBar from '../../components/Builder/ToolBar/ToolBar'
import Resume from '../../components/Builder/Resume/Resume'

import './Builder.css';

const Builder = ({toolbarOpen}) => (
  <>
    <NavBar/>
    <ToolBar/>
    <Resume/>
  </>

)

Builder.defaultProps = {};

Builder.propTypes = {};

export default withRouter(Builder);
