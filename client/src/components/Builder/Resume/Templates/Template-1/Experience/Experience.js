import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPeriod } from '../../../../../../utils/resume'

const Experience = ({ experience, font }) => (
  <section data-testid="Experience" className="resume-experience">
    <h2 style={{ fontFamily: font }}>
      Experience
    </h2>
    <hr />
    <ul>
      {experience.map(
        (exp, i) => exp.isVisible !== false && (
        <li key={i}>
          <h3 style={{ fontFamily: font }}>
            {exp.position}
          </h3>
          {<h3 style={{ fontFamily: font }}>
              {getPeriod(exp)}
            </h3>}
          <em>{`${exp.company}`}</em>
          <ul>
            {exp.achievements.map((achievement, i) => (
              <li key={i}>{achievement.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "")}</li>
            ))}
          </ul>
        </li>
        ),
      )}
    </ul>
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
