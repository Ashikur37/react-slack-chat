import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../../firebase';
import { connect } from 'react-redux';

class UserPanel extends Component {
	state = {
		user: null,
	};
	componentDidMount() {
		this.setState({
			user: this.props.currentUser,
		});
	}
	dropdownOptions = () => [
		{
			key: 'user',
			text: (
				<span>
					Signed in as <strong>User</strong>
				</span>
			),
			disabled: true,
		},
		{ key: 'avatar', text: <span>Change Avatar</span> },
		{
			key: 'signout',
			text: <span onClick={this.handleSignout}>Signe Out</span>,
		},
	];
	handleSignout = () => {
		firebase
			.auth()
			.signOut()
			.then();
	};
	render() {
		const { user } = this.state;
		return (
			<Grid style={{ background: '4c3c4c' }}>
				<Grid.Column>
					<Grid.Row style={{ padding: '1.2em', margin: 0 }}>
						<Header inverted floated="left" as="h2">
							<Icon name="code" />
							<Header.Content>Devchat</Header.Content>
						</Header>
						<Header style={{ padding: '0.25em' }} as="h4" inverted>
							<Dropdown
								trigger={
									<span>
										<Image src={user ? user.photoURL : ''} spaced="right" avatar />
										{user ? user.displayName : ''}
									</span>
								}
								options={this.dropdownOptions()}
							/>
						</Header>
					</Grid.Row>
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.user.currentUser,
	};
};
export default connect(mapStateToProps)(UserPanel);
