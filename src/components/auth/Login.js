import React, { Component } from 'react';
import { Grid, Form, Segment, Header, Button, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';
class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: [],
		loading: false,
	};
	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	displayErrors = errors => {
		return errors.map((error, i) => <p key={i}>{error.message}</p>);
	};

	handleSubmit = event => {
		if (!this.isFormValid(this.state)) return;
		this.setState({ errors: [], loading: true });
		event.preventDefault();
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(signedInUser => {
				console.log(signedInUser);
				this.setState({ loading: false });
			})
			.catch(e => {
				console.log(e);
				this.setState({ loading: false, errors: this.state.errors.concat(e) });
			});
	};
	isFormValid = ({ email, password }) => email && password;
	handleInputError = (errors, inputName) => {
		return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : '';
	};
	render() {
		const { email, password, errors, loading } = this.state;
		return (
			<Grid textAlign="center" verticalAlign="middle" className="app">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h1" icon color="violet" textAlign="center">
						<Icon name="code branch" color="violet" />
						Login to Dev chat
					</Header>
					<Form size="large" onSubmit={this.handleSubmit}>
						<Segment stacked>
							<Form.Input
								fluid
								name="email"
								icon="mail"
								iconPosition="left"
								placeholder="Enter the email"
								onChange={this.handleChange}
								type="email"
								value={email}
								className={this.handleInputError(errors, 'email')}
							/>
							<Form.Input
								fluid
								name="password"
								icon="lock"
								iconPosition="left"
								placeholder="Enter the password"
								onChange={this.handleChange}
								type="password"
								value={password}
								className={this.handleInputError(errors, 'password')}
							/>

							<Button
								disabled={loading}
								className={loading ? 'loading' : ''}
								fluid
								color="violet"
								size="large"
							>
								Submit
							</Button>
						</Segment>
					</Form>
					{errors.length > 0 && (
						<Message error>
							<h3>Error</h3>
							{this.displayErrors(errors)}
						</Message>
					)}
					<Message>
						Don't have an account? <Link to="/register">Register</Link>
					</Message>
				</Grid.Column>
			</Grid>
		);
	}
}
export default Login;
