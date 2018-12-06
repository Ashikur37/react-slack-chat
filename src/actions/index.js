import * as actionTYpes from './types';

export const setUser = user => {
	return {
		type: actionTYpes.SET_USER,
		payload: {
			currentUser: user,
		},
	};
};
