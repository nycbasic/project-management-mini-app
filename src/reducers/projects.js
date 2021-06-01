import { GET_PROJECTS, CLEAR_PROJECTS } from '../actions/Types';

const INIT = {
	projects: [],
	loading: false
};

export default function(state = INIT, action) {
	switch (action.type) {
		case GET_PROJECTS:
			return {
				projects: action.payload.projects,
				loading: action.payload.loading
			};
		case CLEAR_PROJECTS:
			return {
				projects: action.payload,
				loading: false
			};
		default:
			return state;
	}
}
