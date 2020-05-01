import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const Header = ({
	header,
	font
}) => (
		<header className="resume-header" style={{ fontFamily: font }}>
			<div id="headshot">
				<img src="./../assets/images/headshot.jpg" alt="Alan Smith" />
			</div>

			<div id="name">
				<h1 style={{ fontFamily: font }}>{header.name}</h1>
				<h2 style={{ fontFamily: font }}>Software Engineer</h2>
			</div>

			<div id="contactDetails">
				<ul>
					<li>Email: <a href="mailto:joe@bloggs.com" target="_blank" rel="noopener noreferrer">{header.email}</a></li>
					<li>Website: <a href="http://www.bloggs.com">{header.website}</a></li>
					<li>Mobile: {header.phone}</li>
					<li>GitHub: {header.github}</li>
					<li>LinkedIn: {header.linkedin}</li>
					<li>Address: {header.address}</li>
				</ul>
			</div>
			<div className="clear"></div>
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



