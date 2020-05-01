import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import linkedinIcon from '../../../../../../icons/linkedin.svg';
import mailIcon from '../../../../../../icons/mail.svg';
import phoneIcon from '../../../../../../icons/phone.svg';
import websiteIcon from '../../../../../../icons/internet.svg';
import githubIcon from '../../../../../../icons/github.svg';

export const Header = ({
  header,
  font
}) => (
  <header className="resume-header" style={{ fontFamily: font }}>
    <h1 style={{ fontFamily: font }}>{header.name}</h1>
    <ul>
      <li data-testid="Email">
        <a href={`mailto:${header.email}?subject=Interview%20Request`}>
          <img src={mailIcon} className="header-icon normal-icon" alt="Mail Icon" />
          {header.email}
        </a>
      </li>
      <li data-testid="Phone">
        <a href={`tel:${header.phone}`}>
          <img src={phoneIcon} className="header-icon normal-icon" alt="Phone Icon" />
          {header.phone}
        </a>
      </li>
      <li data-testid="Github">
        <a href={header.github} target="_new">
          <img src={githubIcon} className="header-icon normal-icon" alt="Github Icon" />
          {header.github}
        </a>
      </li>
      <li data-testid="LinkedIn">
        <a href={header.linkedin} target="_new">
          <img src={linkedinIcon} className="header-icon normal-icon" alt="LinkedIn Icon" />
          {header.linkedin}
        </a>
      </li>
      <li data-testid="Website">
        <a href={header.website} target="_new">
          <img src={websiteIcon} className="header-icon normal-icon" alt="Website Icon" />
          {header.website}
        </a>
      </li>
    </ul>
    <ul data-testid="Address">
      <li>{header.address}</li>
    </ul>
  </header>
);

Header.defaultProps = {
  header: undefined
};

Header.propTypes = {
  header: PropTypes.shape({}),
  font: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  header: state.resume.header,
  font: state.tools.font
});

export default connect(mapStateToProps)(Header);



