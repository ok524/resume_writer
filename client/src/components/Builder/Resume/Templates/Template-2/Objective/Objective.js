import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import uuid from 'uuid/v4';

const Objective = ({ objective, font }) => (
  <section data-testid="Objective" className="resume-objective">
	<article>
		<div className="sectionTitle">
			<h1 style={{ fontFamily: font }}>Objectives</h1>
		</div>
		
		<div className="sectionContent">
			<p style={{ fontFamily: font }}>{(objective.objective) ? objective.objective.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "") : ''}</p>
		</div>
	</article>
	<div className="clear"></div>
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
