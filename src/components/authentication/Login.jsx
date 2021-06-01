import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import LoginForm from './Forms/login-form';
import { loginUser } from '../../actions/Auth';
import { clearErrors } from '../../actions/Errors';
import { clearFlashMsg } from '../../actions/Flash';
import TextFieldInput from '../../components/common/TextField';
import FlashMessage from 'react-flash-message';
// import Spinner from '../common/Spinner';
import { Animated } from 'react-animated-css';

class Login extends Component {
	handleLoginSubmit = (e) => {
		e.preventDefault();
		const {
			loginEmail,
			loginPassword,
			loginUser,
			clearErrors,
			clearFlashMsg,
			// onFormClear,
		} = this.props;
		loginUser(
			{ email: loginEmail, password: loginPassword },
			this.props.history
		);
		clearErrors();
		clearFlashMsg();
	};

	render() {
		const { email, password } = this.props.errors;
		const { msg } = this.props.flash;
		const {
			onFieldChange,
			onSelectClear,
			loginEmail,
			loginPassword,
      // onFormClear
		} = this.props;

		return (
			<React.Fragment>
				<div className='login'>
					<div className='container'>
						<div className='flash'>
							{msg && (
								<Animated animationIn='fadeIn' animationOut='fadeOut'>
									<FlashMessage duration={4000}>
										<div className='alert alert-success'>{msg}</div>
									</FlashMessage>
								</Animated>
							)}
						</div>
						<form onSubmit={this.handleLoginSubmit}>
							<h3>Please Log-in!</h3>
							<TextFieldInput
								title='Email Address'
								type='text'
								name='email'
								placeholder='Enter your email address'
								value={loginEmail}
								onSelect={onSelectClear}
								onChange={onFieldChange}
								error={email}
							/>
							<TextFieldInput
								title='Password'
								type='password'
								name='password'
								placeholder='Enter your password'
								value={loginPassword}
								onChange={onFieldChange}
								onSelect={onSelectClear}
								error={password}
							/>
							<button type='submit' className='btn btn-primary'>
								Log-in
							</button>
							<small className='form-text text-muted'>
								Forgot your <Link to='/password'>password</Link>? Create an{' '}
								<Link to='/signup'>account</Link>!
							</small>
						</form>
           
					</div>
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		flash: state.flash,
		auth: state.auth,
		loading: state.loading,
	};
}

export default connect(
	mapStateToProps,
	{
		loginUser,
		clearErrors,
		clearFlashMsg,
	}
)(Login);
