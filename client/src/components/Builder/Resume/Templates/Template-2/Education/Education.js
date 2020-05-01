import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPeriod } from '../../../../../../utils/resume'
//import uuid from 'uuid/v4';

const Education = ({ education, font }) => (
  <section data-testid="Education" className="resume-education">
	<div className="sectionTitle">
		<h1 style={{ fontFamily: font }}>Education</h1>
	</div>
	
	<div className="sectionContent">
      {education.map(
        (ed, i) => ed.isVisible !== false && (
		<article key={i}>
			<h2 style={{ fontFamily: font }}>{ed.institutionName}</h2>
			<div className="detailsRow">
				<p style={{ fontFamily: font }} className="subDetails left">{ed.speciality}</p>
				<p style={{ fontFamily: font }} className="subDetails right">{getPeriod(ed)}</p>
			</div>
		</article>
        ),
      )}

	</div>
	<div className="clear"></div>
  </section>
);

Education.defaultProps = {
  education: [],
};

Education.propTypes = {
  education: PropTypes.arrayOf(PropTypes.shape({})),
  font: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  education: state.resume.education,
  font: state.tools.font,
});

export default connect(mapStateToProps)(Education);
