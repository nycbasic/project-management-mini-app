import React from 'react';
// import jwtDecoded from "jwt-decode";
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Private = ({ component: Component, auth, ...rest }) => {
	// const session = localStorage.jwt ? false : jwtDecoded(localStorage.jwt);
	const {
		//isAuthenticated,
		user: { exp },
	} = auth;

	const sessionExpired = Date.now() / 1000 > exp;
	const element = document.querySelector('.show');

	if (localStorage.length > 0 && !sessionExpired) {
		return <Route {...rest} render={(props) => <Component {...props} />} />;
	}
	if (element) {
		element.classList.remove('show');
	}
	console.log('RENDER: Private Redirect');
	return <Redirect to='/' />;
};

function mapStateToProps(state) {
	return {
		auth: state.auth,
	};
}

export default connect(mapStateToProps)(Private);
