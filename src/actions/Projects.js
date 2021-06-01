import axios from 'axios';
import $ from 'jquery';
import {
	GET_PROJECTS,
	// CLEAR_PROJECTS,
	GET_ERRORS,
	CLEAR_TASKS,
} from '../actions/Types';
// import { clearErrors, sendError } from './Errors';
import { logoutUser } from './Auth';
import { setModalLoader } from './loading';

const url = 'https://project-management-mini-server.herokuapp.com';

export const getProjects = () => (dispatch) => {
	dispatch({
		type: GET_PROJECTS,
		payload: {
			projects: [],
			loading: true,
		},
	});
	axios
		.get(`${url}/api/projects/`)
		.then((res) => {
			dispatch({
				type: GET_PROJECTS,
				payload: {
					projects: res.data,
					loading: false,
				},
			});
		})
		.catch((err) => {
			if (err) {
				console.log(err);
				// const userAuthError = err.response.status === 401;
				// if(userAuthError){
				// 	// dispatch(sendError(err.response.data));
				// }
				// else {
				// 	// dispatch(sendError(err.response.data));
				// }
			}
		});
};

/* 
Problem: setModalLoader to render loading when executing an asynchronos action closes modal and doesn't hold the modal and set the the errors to the modal.
Possible Solutions:
Create a seperate component and logic that renders the loading in the modal itself rather than having it render for the whole page.
Ex: setModalLoader, setModalLoader

Also adding three states to help with the logic to either keep the modal open or not:
Ex: Three States
  1) PENDING
  2) SUCCESS
  3) FAILED
*/

export const createProject = (name) => (dispatch) => {
	dispatch(setModalLoader(true, 'PENDING'));
	axios
		.post(`${url}/api/projects`, name)
		.then((res) => {
			if (res.status === 200) {
				dispatch({
					type: GET_PROJECTS,
					payload: {
						projects: res.data,
						loading: false,
					},
				});
				$('#default-modal').modal('hide');
				return 'success';
			}
		})
		.then((res) => {
			if (res === 'success') {
				dispatch({
					type: GET_ERRORS,
					payload: '',
				});
				dispatch(setModalLoader(false, 'SUCCESS'));
			}
		})
		.catch((err) => {
			const error = err.response.status === 401;
			if (error) {
				dispatch(logoutUser());
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				});
				dispatch(setModalLoader(false, 'FAILED'));
			}
		});
};

export const deleteProjects = () => (dispatch) => {
	dispatch(setModalLoader(true, 'PENDING'));
	axios
		.delete(`${url}/api/projects`)
		.then((res) => {
			dispatch({
				type: GET_PROJECTS,
				payload: {
					projects: res.data,
					loading: false,
				},
			});
			dispatch({
				type: CLEAR_TASKS,
				payload: false,
			});
			dispatch(setModalLoader(false, 'SUCCESS'));
			$('#default-modal').modal('hide');
		})
		.catch((err) => {
			const error = err.response.status === 401;
			if (error) {
				dispatch(setModalLoader(false, ''));
				dispatch(logoutUser());
			} else {
				return false;
			}
		});
};

export const deleteProject = (id) => (dispatch) => {
	dispatch({
		type: GET_PROJECTS,
		payload: {
			projects: [],
			loading: true,
		},
	});
	axios
		.delete(`${url}/api/projects/${id}`)
		.then((res) => {
			dispatch(getProjects());
			dispatch({
				type: CLEAR_TASKS,
				payload: false,
			});
			$('#default-modal').modal('hide');
		})
		.catch((err) => {
			const error = err.response.status === 401;
			if (error) {
				dispatch(logoutUser());
			} else {
				return false;
			}
		});
};

export const updateProject = (id, arr) => (dispatch) => {
	dispatch(setModalLoader(true, 'PENDING'));
	axios
		.put(`${url}/api/projects/status/${id}`, arr)
		.then(() => {
			dispatch(getProjects());
			dispatch({
				type: CLEAR_TASKS,
				payload: false,
			});
			dispatch(setModalLoader(false, 'SUCCESS'));
			$('#default-modal').modal('hide');
		})
		.catch((err) => {
			const error = err.response.status === 401;
			if (error) {
				dispatch(logoutUser());
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				});
				dispatch(setModalLoader(false, 'FAILED'));
			}
		});
};

export const editProject = (id, edit) => (dispatch) => {
	dispatch(setModalLoader(true, 'PENDING'));
	axios
		.put(`${url}/api/projects/${id}`, edit)
		.then((res) => {
			dispatch({
				type: GET_PROJECTS,
				payload: {
					projects: res.data,
					loading: false,
				},
			});
			dispatch(setModalLoader(false, 'SUCCESS'));
			$('#default-modal').modal('hide');
		})
		.catch((err) => {
			const error = err.response.status === 401;
			if (error) {
				dispatch(logoutUser());
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				});
				dispatch(setModalLoader(false, 'FAILED'));
			}
		});
};
