import React, { Component } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
class Channels extends Component {
	state = {
		channels: [],
		modal: false,
		channelName: '',
		channelDetails: '',
		channelsRef: firebase.database().ref('channels'),
	};
	closeModal = () => {
		this.setState({
			modal: false,
		});
	};
	openModal = () => {
		this.setState({
			modal: true,
		});
	};
	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	componentDidMount() {
		this.addListeners();
	}
	addListeners = () => {
		let looadChannels = [];
		this.state.channelsRef.on('child_added', snap => {
			looadChannels.push(snap.val());
			this.setState({ channels: looadChannels });
		});
	};
	addChannel = () => {
		const { channelsRef, channelName, channelDetails } = this.state;
		const { currentUser } = this.props;
		const key = channelsRef.push().key;
		const newChannel = {
			id: key,
			name: channelName,
			details: channelDetails,
			createdBy: {
				name: currentUser.displayName,
				avatar: currentUser.photoURL,
			},
		};
		channelsRef
			.child(key)
			.update(newChannel)
			.then(() => {
				this.setState({ channelName: '', channelDetails: '' });
				this.closeModal();
				console.log('added');
			});
	};
	handleSubmit = event => {
		event.preventDefault();
		if (this.isFormValid(this.state)) {
			this.addChannel();
		}
	};
	dislayChannels = channels =>
		channels.length > 0 &&
		channels.map(channel => (
			<Menu.Item
				key={channel.id}
				onClick={() => console.log(channel)}
				name={channel.name}
				style={{ opacity: '0.7' }}
			>
				# {channel.name}
			</Menu.Item>
		));
	isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails;
	render() {
		const { channels, modal } = this.state;
		return (
			<div>
				<Menu.Menu style={{ paddingBottom: '2em' }}>
					<Menu.Item>
						<span>
							<Icon name="exchange" />
							Channels
						</span>{' '}
						({channels.length})
						<Icon name="add" onClick={this.openModal} />
					</Menu.Item>
					{this.dislayChannels(channels)}
				</Menu.Menu>
				<Modal basic open={modal} onClose={this.closeModal}>
					<Modal.Header>Add a channel</Modal.Header>
					<Modal.Content>
						<Form onSubmit={this.handleSubmit}>
							<Form.Field>
								<Input fluid label="name of channel" name="channelName" onChange={this.handleChange} />
							</Form.Field>
							<Form.Field>
								<Input
									fluid
									label="About the channel"
									name="channelDetails"
									onChange={this.handleChange}
								/>
							</Form.Field>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button color="green" inverted onClick={this.handleSubmit}>
							<Icon name="checkmark" />
							Add
						</Button>
						<Button color="red" inverted onClick={this.closeModal}>
							<Icon name="remove" />
							Cancel
						</Button>
					</Modal.Actions>
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		currentUser: state.user.currentUser,
	};
};
export default connect(mapStateToProps)(Channels);
