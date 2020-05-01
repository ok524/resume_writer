import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPeriod } from '../../../../../../utils/resume'

const Experience = ({ experience, font }) => (
  <section data-testid="Experience" className="resume-experience">
	<div className="sectionTitle">
		<h1 style={{ fontFamily: font }}>Work Experience</h1>
	</div>
	
	<div className="sectionContent">
		<article>
      {experience.map(
        (exp, expIdx) => exp.isVisible !== false && (
<div key={expIdx}>
	<h2 style={{ fontFamily: font }}>{exp.position}</h2>
	<div className="detailsRow">
		<p style={{ fontFamily: font }} className="subDetails left">{exp.company}</p>
		<p style={{ fontFamily: font }} className="subDetails right">{getPeriod(exp)}</p>
	</div>
	<ul>
	{exp.achievements.map((achievement, i) => (
	  <li key={i}>{achievement.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "")}</li>
	))}
	</ul>
</div>
        ),
      )}
		</article>
	</div>
	
	<div className="clear"></div>
  </section>
);

Experience.defaultProps = {
  experience: [],
};

Experience.propTypes = {
  experience: PropTypes.arrayOf(PropTypes.shape({})),
  font: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  experience: state.resume.experience,
  font: state.tools.font,
});

export default connect(mapStateToProps)(Experience);
