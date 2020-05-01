import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPeriod } from '../../../../../../utils/resume'
//import uuid from 'uuid/v4';

const Education = ({ education, font }) => (
  <section data-testid="Education" className="resume-education">
    <h2 style={{ fontFamily: font }}>Education</h2>
    <hr />
    <ul>
      {education.map(
        (ed, i) => ed.isVisible !== false && (
        <li key={i}>
          <h3 style={{ fontFamily: font }}>{ed.institutionName}</h3>
          {<h3 style={{ fontFamily: font }}>
              {getPeriod(ed)}
            </h3>}
          <em>{ed.speciality}</em>
        </li>
        ),
      )}
    </ul>
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
