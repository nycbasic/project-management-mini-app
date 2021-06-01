import {
	GET_TASKS,
	CLEAR_TASKS,
	RESET_COMPLETED_TASKS
} from '../actions/Types';

const INIT = {
	tasks: [],
	loading: false,
	allCompleted: false
};

export default function (state = INIT, action) {
	switch (action.type) {
		case GET_TASKS:
			return {
				tasks: action.payload.tasks,
					loading: action.payload.loading,
					allCompleted: action.payload.allCompleted
			};
		case CLEAR_TASKS:
			return {
				tasks: [],
					loading: action.payload,
					allCompleted: false
			};
		case RESET_COMPLETED_TASKS:
			return {
				tasks: state.tasks,
					loading: state.loading,
					allCompleted: action.payload
			};
		default:
			return state;
	}
}