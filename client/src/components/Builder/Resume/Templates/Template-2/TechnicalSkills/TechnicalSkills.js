import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const retString = kw => (typeof kw === 'string' ? kw : kw.name);

const TechnicalSkills = ({ techSkills, showSkillLevel, font }) => (
  <section data-testid="TechSkills" className="resume-tech-skills">
    <div className="sectionTitle">
      <h1 style={{ fontFamily: font }}>Key Skills</h1>
    </div>

    <div className="sectionContent">
      {techSkills.map(
        (skill, index) => skill.isVisble !== false &&
          (true && (
            <article key={index}>
              <h2 style={{ fontFamily: font }}>
                {skill.category}
              </h2>
              <div className="key-skills">
                {skill.keywords.map((kw, skillIndex) => (skillIndex === skill.keywords.length - 1 ? retString(kw) : `${retString(kw)}, `))}
              </div>
            </article>
          ))
      )}
    </div>
    <div className="clear"></div>
  </section>
);

TechnicalSkills.defaultProps = {
  techSkills: [],
  showSkillLevel: false,
};

TechnicalSkills.propTypes = {
  techSkills: PropTypes.arrayOf(PropTypes.shape({})),
  showSkillLevel: PropTypes.bool,
  font: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  techSkills: state.resume.technicalSkills,
  showSkillLevel: state.tools.showSkillLevel,
  font: state.tools.font,
});

export default connect(mapStateToProps)(TechnicalSkills);
