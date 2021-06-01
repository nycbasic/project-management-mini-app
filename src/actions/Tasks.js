import axios from 'axios';
import $ from 'jquery';
import {
	GET_TASKS,
	GET_ERRORS,
	CLEAR_TASKS,
	// CLEAR_ERRORS,
	RESET_COMPLETED_TASKS
} from '../actions/Types';
import {
	getProjects
} from './Projects';
import {
	clearErrors
} from './Errors';
import {
	setModalLoader,
	setBodyLoader
} from '../actions/loading';

const url = 'https://project-management-mini-server.herokuapp.com/';

export const resetTasks = () => (dispatch) => {
	dispatch({
		type: RESET_COMPLETED_TASKS,
		payload: false
	});
};

export const clearTasks = () => (dispatch) => {
	dispatch({
		type: CLEAR_TASKS,
		payload: true
	});
};

export const getTasks = (id) => (dispatch) => {
	dispatch(clearTasks());
	dispatch(clearErrors());
	axios
		.get(`${url}/api/projects/tasks/${id}`)
		.then((res) => {
			if (res.data) {
				dispatch({
					type: GET_TASKS,
					payload: {
						tasks: res.data,
						loading: false
					}
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const createTask = (id, newTask) => (dispatch) => {
	dispatch(setModalLoader(true, 'PENDING'));
	axios
		.post(`${url}/api/projects/tasks/${id}`, newTask)
		.then((res) => {
			if (res.data) {
				dispatch(clearErrors());
				dispatch({
					type: GET_TASKS,
					payload: {
						tasks: res.data,
						loading: false
					}
				});
				dispatch(setModalLoader(false, 'SUCCESS'));
				$('#default-modal').modal('hide');
			}
			// why did I decided to return this???
			return res.data;
		})
		.then((val) => {
			if (val.length <= 1) {
				dispatch(getProjects());
				dispatch(setModalLoader(false, 'SUCCESS'));
			}
			dispatch(setModalLoader(false, ''));
			return false;
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
			dispatch(setModalLoader(false, 'FAILED'));
		});
};

export const deleteTasks = (id) => (dispatch) => {
	dispatch(setModalLoader(true, 'PENDING'));
	axios
		.delete(`${url}/api/projects/tasks/${id}`)
		.then((res) => {
			dispatch({
				type: GET_TASKS,
				payload: {
					tasks: res.data,
					loading: false
				}
			});
			$('#default-modal').modal('hide');
			return res.data;
		})
		.then((val) => {
			if (val.length < 1) {
				dispatch(getProjects());
			}
			dispatch(setModalLoader(false, 'SUCCESS'));
			return false;
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const deleteTask = (project_id, todo_id) => (dispatch) => {
	dispatch({
		type: GET_TASKS,
		payload: {
			tasks: [],
			loading: true
		}
	});
	axios
		.delete(`${url}/api/projects/tasks/${project_id}/${todo_id}`)
		.then((res) => {
			dispatch({
				type: GET_TASKS,
				payload: {
					tasks: res.data,
					loading: false
				}
			});
			$('#default-modal').modal('hide');
			return res.data;
		})
		.then((val) => {
			if (val.length < 1) {
				dispatch(getProjects());
			}
			return false;
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const editTask = (project_id, todo_id, newTask) => (dispatch) => {
	dispatch(setModalLoader(true, 'PENDING'));
	axios
		.put(`${url}/api/projects/tasks/${project_id}/${todo_id}`, newTask)
		.then((res) => {
			dispatch({
				type: GET_TASKS,
				payload: {
					tasks: res.data,
					loading: false
				}
			});
			dispatch(setModalLoader(false, 'SUCCESS'));
			$('#default-modal').modal('hide');
			return;
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
			dispatch(setModalLoader(false, 'FAILED'));
		});
};

export const updateTaskStatus = (project_id, todo_id) => (dispatch) => {
	dispatch(setBodyLoader(true, 'PENDING'));
	axios
		.put(`${url}/api/projects/tasks/status/${project_id}/${todo_id}`)
		.then((res) => {
			const allTaskCompleted = res.data.every((task) => {
				return task.completed === true;
			});

			dispatch({
				type: GET_TASKS,
				payload: {
					tasks: res.data,
					loading: false,
					allCompleted: allTaskCompleted
				}
			});
			dispatch(setBodyLoader(false, 'SUCCESS'));
			if (allTaskCompleted) $('#task-completed-modal').modal('show');
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err
			});
			dispatch(setBodyLoader(false, 'FAILED'));
		});
};