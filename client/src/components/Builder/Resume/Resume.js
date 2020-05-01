import { withRouter } from 'react-router-dom';
import React, { useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { paperSizes } from '../../../utils/pageSizes'
import { updateResume } from '../../../action/builder';
import {
  OBJECTIVE,
  EDUCATION,
  TECH_SKILLS,
  PROJECTS,
  EXPERIENCE,
  CERTIFICATION,
  defaultResumeOrder,
} from '../../../utils/resume';

const Resume = ({ auth, font, template, order, paperSize, match, dispatch }) => {

  useEffect(() => {
    if (!match.params) {
      return;
    }

    if (match.params.resumeId) {
      fetch(process.env.REACT_APP_WEB_API_URL + '/user', {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      })
        .then(res => res.json())
        .then(res => JSON.parse(res['user']))
        .then((user) => {
          fetch(`${process.env.REACT_APP_WEB_API_URL}/resume?id=${match.params.resumeId}`, {
            headers: {
              'Authorization': `Bearer ${auth.token}`
            }
          })
            .then(res => res.json())
            .then(res => JSON.parse(res['resume']))
            .then((resume) => {
              resume.header = user;
              dispatch(updateResume(resume));
            });
        });
    }
  }, [match.params, dispatch, auth.token]);

  const Objective = React.lazy(() => import(`./Templates/${template}/Objective/Objective`))
  const ResumeHeader = React.lazy(() => import(`./Templates/${template}/Header/Header`))
  const Education = React.lazy(() => import(`./Templates/${template}/Education/Education`))
  const Experience = React.lazy(() => import(`./Templates/${template}/Experience/Experience`))
  const Projects = React.lazy(() => import(`./Templates/${template}/Projects/Projects`))
  const Certifications = React.lazy(() => import(`./Templates/${template}/Certifications/Certifications`))
  const TechnicalSkills = React.lazy(() => import(`./Templates/${template}/TechnicalSkills/TechnicalSkills`))

  return (
    <>
      <link rel="stylesheet" type="text/css" href={`${process.env.PUBLIC_URL}/resume-templates/${template}.css`} />
      <div className={classNames('react-resume', paperSize.tag)}>
        <div
          className="resume"
          style={{ fontFamily: font }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <ResumeHeader />
            {order.map((item, i) => {
              switch (item) {
                case OBJECTIVE:
                  return <Objective key={i} />;
                case EDUCATION:
                  return <Education key={i} />;
                case EXPERIENCE:
                  return <Experience key={i} />;
                case PROJECTS:
                  return <Projects key={i} />;
                case CERTIFICATION:
                  return <Certifications key={i} />;
                case TECH_SKILLS:
                  return <TechnicalSkills key={i} />;
                default:
                  return <p key={i}></p>;
              }
            })}
          </Suspense>
        </div>
      </div>
    </>
  )
}

Resume.defaultProps = {
  font: undefined,
  order: defaultResumeOrder,
  paperSize: paperSizes[0]
};

Resume.propTypes = {
  font: PropTypes.string,
  order: PropTypes.arrayOf(PropTypes.number),
  paperSize: PropTypes.shape({
    name: PropTypes.string,
    tag: PropTypes.string,
  })
};

const mapStateToProps = state => ({
  font: state.tools.font,
  template: state.tools.template,
  order: state.tools.order,
  paperSize: paperSizes.find(size => size.tag === state.tools.paperSize),
  resume: state.resume,
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Resume));