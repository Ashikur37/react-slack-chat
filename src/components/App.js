import React from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';
const App = () => {
	return (
		<Grid columns="equal" className="app">
			<ColorPanel />
			<SidePanel />
			<Grid.Column>
				<Messages />
			</Grid.Column>
			<MetaPanel />
		</Grid>
	);
};

export default App;
