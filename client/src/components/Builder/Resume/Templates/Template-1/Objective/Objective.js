import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import uuid from 'uuid/v4';

const Objective = ({ objective, font }) => (
  <section data-testid="Objective" className="resume-objective">
    <h2 style={{ fontFamily: font }}>Objective</h2>
    <hr />
    <h3 style={{ fontFamily: font }}>{(objective.objective) ? objective.objective.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "") : ''}</h3>
  </section>
);

Objective.defaultProps = {
  education: [],
};

Objective.propTypes = {
  objective: PropTypes.shape({}),
  font: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  objective: state.resume.objectives,
  font: state.tools.font,
});

export default connect(mapStateToProps)(Objective);
