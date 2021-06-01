import React, { Component } from 'react';
// import JwtDecoded from 'jwt-decode';
import Navbar from '../components/Navbar';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
// import { setCurrentUser, logoutUser } from '../actions/Auth';
// import { setAuthHeader } from '../helpers/set-token';
import { createUser } from '../actions/Auth';
import { clearErrors } from '../actions/Errors';
import Private from '../hoc/private';
import Home from './Home';
import Signup from './authentication/Signup';
import Login from './authentication/Login';
import Dashboard from './Dashboard';
import Reset from './pw-reset/Reset';
import ResetForm from './pw-reset/Reset-Form';
import Spinner from './common/Spinner';
// import store from '../redux-store';

class App extends Component {
	state = {
		fullName: '',
		email: '',
		password: '',
		password2: '',
		errors: '',
	};
	// FIX - BEGIN: Need to rethink this and update this lifecycle according to React Doc's. WilMount is no longer safe to use and will be deprecated. The DidMount affects the session when the page is refreshed due to the the way the didMount lifecycle works where the logic encapsalated in the didMount method fires last and the render of the dom happens first.
	// FIX - END

	componentWillReceiveProps(newProps) {
		if (newProps.errors) {
			this.setState({
				errors: newProps.errors,
			});
		}
	}

	handleFieldChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
		if (
			typeof this.state.errors === 'object' &&
			typeof this.props.errors === 'object'
		) {
			clearErrors();
			this.setState({
				errors: '',
			});
		}
	};

	handleClearSelectErrors = () => {
		const { clearErrors } = this.props;
		clearErrors();
	};

	handleClearForm = (e) => {
		const { clearErrors } = this.props;
		e.preventDefault();
		this.setState({
			fullName: '',
			email: '',
			password: '',
			password2: '',
		});
		clearErrors();
	};

	render() {
		return (
			<Router>
				<React.Fragment>
					<Navbar />
					<div className='main'>
						{this.props.loading.load.body && (
							<div className='loader'>
								<Spinner />
							</div>
						)}
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => (
									<Home
										{...props}
										onFieldChange={this.handleFieldChange}
										onSelectClear={this.handleClearSelectErrors}
										loginEmail={this.state.email}
										loginPassword={this.state.password}
										errors={this.state.errors}
									/>
								)}
							/>
							<Route
								path='/signup'
								render={(props) => (
									<Signup
										{...props}
										onCreateUser={this.props.createUser}
										onFieldChange={this.handleFieldChange}
										onSelectClear={this.handleClearSelectErrors}
										onFormClear={this.handleClearForm}
										signUpFullName={this.state.fullName}
										signUpEmail={this.state.email}
										signUpPassword={this.state.password}
										signUpPassword2={this.state.password2}
										errors={this.state.errors}
									/>
								)}
							/>
							<Route
								path='/login'
								render={(props) => (
									<Login
										{...props}
										onFieldChange={this.handleFieldChange}
										onSelectClear={this.handleClearSelectErrors}
										onFormClear={this.handleClearForm}
										loginEmail={this.state.email}
										loginPassword={this.state.password}
										errors={this.state.errors}
									/>
								)}
							/>
							<Route
								path='/password'
								render={(props) => (
									<Reset
										{...props}
										onFieldChange={this.handleFieldChange}
										onSelectClear={this.handleClearSelectErrors}
										resetEmail={this.state.email}
										errors={this.state.errors}
									/>
								)}
							/>
							<Route path='/reset/:token' component={ResetForm} />
							<Route path='/spinner' component={Spinner} />
							<Private
								{...this.state}
								path='/dashboard'
								component={Dashboard}
							/>
						</Switch>
					</div>
				</React.Fragment>
			</Router>
		);
	}
}

function mapStateToProps(state) {
	return {
		errors: state.errors,
		loading: state.loading,
		auth: state.auth,
	};
}

export default connect(
	mapStateToProps,
	{ clearErrors, createUser }
)(App);
