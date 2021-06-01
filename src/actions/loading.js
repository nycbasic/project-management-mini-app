import { BODY_LOADING, MODAL_LOADING } from './Types';

export const setBodyLoader = (val) => (dispatch) => {
	return dispatch({
		type: BODY_LOADING,
		payload: val
	});
};
export const setModalLoader = (val, status) => (dispatch) => {
	return dispatch({
		type: MODAL_LOADING,
		payload: {
			val,
			status
		}
	});
};

export const setProjectShimmer = (val) => (dispatch) => {
	return dispatch({});
};
