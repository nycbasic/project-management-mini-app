import { BODY_LOADING, MODAL_LOADING } from '../actions/Types';

const INIT = {
	load: {
		body: false,
		modal: false
	}
};

export default function(state = INIT, action) {
	switch (action.type) {
		case BODY_LOADING:
			return {
				load: {
					body: action.payload,
					modal: false
				}
			};
		case MODAL_LOADING:
			return {
				load: {
					body: false,
					modal: action.payload.val,
					status: action.payload.status
				}
			};
		default:
			return state;
	}
}
