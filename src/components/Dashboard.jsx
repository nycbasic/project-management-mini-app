import React, { Component } from 'react';
import JwtDecoded from 'jwt-decode';
import { connect } from 'react-redux';
import { Animated } from 'react-animated-css';
import { deleteUser, setCurrentUser, logoutUser } from '../actions/Auth';
import { setModalLoader } from '../actions/loading';
import {
	getProjects,
	createProject,
	deleteProjects,
	deleteProject,
	updateProject,
	editProject,
} from '../actions/Projects';
import {
	getTasks,
	createTask,
	deleteTasks,
	deleteTask,
	editTask,
	updateTaskStatus,
	clearTasks,
	resetTasks,
} from '../actions/Tasks';

import { clearErrors, sendError } from '../actions/Errors';
// import Spinner from "./common/Spinner";
import Modal from '../common/modal';
import TaskCompletedModal from '../common/modal_completed_tasks';
import Projects from './Projects';
import CompletedProjects from './Completed_Projects';
import InProgress from './In_Progress';
import Tasks from './Tasks';
import store from '../redux-store';
// import checkAuth from "../hoc/check_auth";
import { setAuthHeader } from '../helpers/set-token';

function authCheck() {
	try {
		store.dispatch(setCurrentUser(JwtDecoded(localStorage.jwt)));
	} catch (err) {
		logoutUser();
	}
}

export class Dashboard extends Component {
	state = {
		name: '',
		text: '',
		action: '',
		target: '',
		project_id: '',
		project_name: '',
		task_id: '',
		task_name: '',
		task_text: '',
		status: '',
		tasks: [],
	};

	componentDidMount() {
		const { getProjects } = this.props;
		if (localStorage.jwt) {
			authCheck();
			setAuthHeader(localStorage.jwt);
			getProjects();
		} else {
			logoutUser();
		}
	}

	// componentDidUpdate(prevProps, prevState, snapShot) {
	//   console.log(
	//     "DIDUPDATE LIFECYCLE METHOD - PRVEVIOUS PROPS: ",
	//     prevProps.projects,
	//     this.props.projects,
	//     this.props.tasks
	//   );
	// }

	handleNameChange = (e) => {
		const {
			clearErrors,
			errors: { name },
		} = this.props;

		if (name) {
			clearErrors();
		}
		this.setState({
			name: e.target.value,
		});
	};

	handleWysiwygChange = (text) => {
		const { clearErrors, errors } = this.props;

		if (errors.text) {
			clearErrors();
		}
		this.setState({
			text,
		});
	};

	handleProjectClick = (project_id = '', project_name = '') => {
		const { getTasks } = this.props;
		getTasks(project_id);
		this.setState({
			project_id,
			project_name,
		});
	};

	handleProjectSubmit = () => {
		const {
			createProject,
			projects: { projects },
			// setModalLoader,
			sendError,
			clearErrors,
			errors,
		} = this.props;
		const { name } = this.state;

		const allProjects = projects.map((project) => {
			return project.name;
		});

		const isDuplicate = allProjects.some((val) => {
			return val === name;
		});

		if (isDuplicate) {
			sendError({ name: 'Project already exists!' });
			return null;
		}
		if (errors.name) {
			clearErrors();
		}
		// setModalLoader(true, "PENDING");
		const newProject = {
			name,
		};
		createProject(newProject);
		if (name.length !== 0) {
			this.setState({
				name: '',
				action: '',
			});
		}
	};

	handleProjectEdit = (id) => {
		const {
			editProject,
			projects: { projects },
			sendError,
			clearErrors,
			errors,
		} = this.props;
		const { name, project_name } = this.state;

		const allProjects = projects.map((project) => {
			return project.name;
		});

		const isDuplicate = allProjects.some((project) => {
			return project === name;
		});

		if (project_name === name) {
			sendError({ name: 'Cannot use the previous project name!' });
			return null;
		} else if (isDuplicate && project_name !== name) {
			sendError({ name: 'Project already exists!' });
			return null;
		}
		if (errors.name) {
			clearErrors();
		}
		const newProjectEdit = {
			name,
		};

		editProject(id, newProjectEdit);
		this.setState({
			project_name: newProjectEdit.name,
			name: '',
		});
	};

	projectUpdate = () => {
		const { getProjects, projects } = this.props;
		getProjects();
		this.setState({
			projects,
			tasks: '',
		});
	};

	handleTaskSubmit = () => {
		const {
			createTask,
			tasks: { tasks },
			sendError,
		} = this.props;
		const { name, text, project_id } = this.state;
		const newTask = {
			name,
			text,
		};
		const allTasks = tasks.map((task) => {
			return task.name;
		});

		const duplicateTask = allTasks.some((task) => {
			return task === name;
		});

		const emptyHtml = [
			'<p><br></p>',
			'<h1><br></h1>',
			'<h2><br></h2>',
			'<h3><br></h3>',
			'<p><strong><span class="ql-cursor">﻿</span></strong></p>',
			'<p><em><span class="ql-cursor">﻿</span></em></p>',
			'<p><u><span class="ql-cursor">﻿</span></u></p>',
			'<p><strong><em><span class="ql-cursor">﻿</span></em></strong></p>',
			'<p><strong><u><span class="ql-cursor">﻿</span></u></strong></p>',
			'<p><em><u><span class="ql-cursor">﻿</span></u></em></p>',
			'<p><strong><em><u><span class="ql-cursor">﻿</span></u></em></strong></p>',
		];
		// Possible Error Handling Outputs:
		// if the task already exists then return null
		// if the task already exists and the text box is empty return null
		// if the text box is empty return null
		// if there is no name and no text in the textfield return null
		if (duplicateTask && (text === '' || text === '<p><br></p>')) {
			sendError({
				name: 'Task already exists!',
				text: 'Please enter in a description of a task!',
			});
			return null;
		} else if (duplicateTask) {
			sendError({ name: 'Task already exists!' });
			return false;
		} else if (emptyHtml.includes(text) && name === '') {
			sendError({
				name: 'Please enter a name for the task!',
				text: 'Please enter in a description of a task!',
			});
			return null;
		} else if (emptyHtml.includes(text)) {
			sendError({ text: 'Please enter in a description of task!' });
			return null;
		}

		createTask(project_id, newTask);
		if (name.length !== 0 && text.length !== 0) {
			this.setState({
				name: '',
				text: '',
				action: '',
				tasks,
			});
		}
	};

	handleAction = (
		action,
		project_id = '',
		task_id = '',
		name = '',
		text = ''
	) => {
		const { clearErrors, resetTasks, errors } = this.props;
		resetTasks();
		if (errors) {
			clearErrors();
		}

		this.setState({
			action,
			name,
			text,
			task_id,
			task_name: name,
			task_text: text,
		});
	};

	handleClearAction = () => {
		this.setState({
			action: '',
			name: '',
			text: '',
		});
	};

	handleDelete = () => {
		this.props.deleteProjects();
		this.setState({
			id: '',
		});
	};

	handleDeleteProject = (id) => {
		this.props.deleteProject(id);
		this.handleClearAction();
	};

	handleProjectUpdate = (id) => {
		const {
			tasks: { tasks },
			updateProject,
		} = this.props;
		const completeAll = tasks.map((task) => {
			if (!task.completed) {
				task.completed = true;
			}
			return task;
		});
		updateProject(id, completeAll);
		this.setState({
			tasks: '',
			project_name: '',
			project_id: '',
		});
		this.handleClearAction();
	};

	handleAllCompletedTasks = (action) => {
		this.setState({
			action,
		});
	};

	handleCompletedTaskStatus = (project_id, task_id) => {
		const {
			updateTaskStatus,
			// tasks: { tasks },
			// projects: { projects }
		} = this.props;
		/* Need to update the updateTaskStatus to include a check to see if all the tasks are complete, and if it is to send a different state to let the DOM know that the completed Modal is needed*/
		updateTaskStatus(project_id, task_id);
		// if (this.handleAllCompletedTasks(tasks)) {
		// 	console.log('FROM THE ACTUAL HANDLE COMPLETED TASK STATUS METHOD FIRED');
		// 	return this.handleAction('complete projects');
		// }
	};

	handleRevertTaskStatus = (project_id, task_id) => {
		const { updateTaskStatus } = this.props;
		updateTaskStatus(project_id, task_id);
	};

	handleDeleteTasks = (id) => {
		this.props.deleteTasks(id);
		this.setState({
			tasks: '',
		});
	};

	// handleProjectSort = () => {
	//   const { projects } = this.props;
	//   const sortedProjects = projects.sort((a, b) => {
	//     const first = a.completed,
	//       second = b.completed;

	//     if (first < second) {
	//       return 1;
	//     }
	//     if (first > second) {
	//       return -1;
	//     }
	//     return 0;
	//   });

	//   this.setState({
	//     projects: sortedProjects
	//   });
	// };

	handleDeleteTask = (project_id, todo_id) => {
		this.props.deleteTask(project_id, todo_id);
		this.handleClearAction();
	};

	handleEditTask = () => {
		// Need to work on this logic when you get a chance too!
		const {
			name,
			text,
			project_id,
			task_id,
			task_name,
			task_text,
		} = this.state;
		const {
			tasks: { tasks },
			editTask,
			sendError,
		} = this.props;

		const duplicateTask = tasks.some((task) => {
			return task.name === name;
		});

		// Possible Outputs:
		// if task name is the same and text field is the same => send error & null;
		// if task name is the same and text field is not => send error & null;
		// if task name is not the same and text field is the same => send error & null;
		// if task name is not the same and text field is not the same => complete edit task.

		/* Need to refactor this to make it better and not look like a noob error handling logic*/
		// if(task_name !== name && task_text === text)

		const emptyHtml = [
			'<p><br></p>',
			'<h1><br></h1>',
			'<h2><br></h2>',
			'<h3><br></h3>',
			'<p><strong><span class="ql-cursor">﻿</span></strong></p>',
			'<p><em><span class="ql-cursor">﻿</span></em></p>',
			'<p><u><span class="ql-cursor">﻿</span></u></p>',
			'<p><strong><em><span class="ql-cursor">﻿</span></em></strong></p>',
			'<p><strong><u><span class="ql-cursor">﻿</span></u></strong></p>',
			'<p><em><u><span class="ql-cursor">﻿</span></u></em></p>',
			'<p><strong><em><u><span class="ql-cursor">﻿</span></u></em></strong></p>',
		];

		if (task_name === name && task_text === text) {
			sendError({
				name: 'Cannot use previous task name!',
				text: 'Cannot use previous description!',
			});
			return null;
		} else if (emptyHtml.includes(text) && name === '') {
			sendError({
				name: 'Please enter a task name!',
				text: 'Please enter a description!',
			});
			return null;
		} else if (name === '') {
			sendError({ name: 'Please enter a task name!' });
			return null;
		} else if (duplicateTask && task_name !== name) {
			sendError({ name: 'Task already exists!' });
			return null;
		} else if (emptyHtml.includes(text) || text === '') {
			sendError({ text: 'Please enter a description!' });
			return null;
		}

		const newTask = {
			name,
			text,
		};

		editTask(project_id, task_id, newTask);
		this.setState({
			name: '',
			text: '',
		});
		this.handleClearAction();
	};

	render() {
		const { fullName, avatar } = this.props.auth.user;
		// const { loading, isAuthenticated } = this.props.auth;

		return (
			<div className='dashboard'>
				<Animated animationIn='bounceIn'>
					<div className='container'>
						<div className='user'>
							<h1>
								<img
									className='rounded-circle'
									src={avatar}
									alt={fullName}
									title='You must have a Gravatar connected to your email to display an image'
								/>
								Welcome, {fullName}!
							</h1>
							<p>{fullName}, your current projects are viewable below!</p>
							<p>
								You have a total of {this.props.projects.projects.length}{' '}
								projects.
							</p>
						</div>

						<div className='row'>
							<div className='col-5'>
								<Projects
									{...this.state}
									{...this.props}
									onAction={this.handleAction}
									onProjectClick={this.handleProjectClick}
									onProjectUpdate={this.handleProjectUpdate}
									onProjectSort={this.handleProjectSort}
								/>
								<InProgress
									{...this.state}
									{...this.props}
									onAction={this.handleAction}
									onProjectClick={this.handleProjectClick}
									onProjectUpdate={this.handleProjectUpdate}
									onProjectSort={this.handleProjectSort}
								/>
								<CompletedProjects
									{...this.state}
									{...this.props}
									onAction={this.handleAction}
									onProjectClick={this.handleProjectClick}
									onProjectUpdate={this.handleProjectUpdate}
									onProjectSort={this.handleProjectSort}
								/>
							</div>
							<div className='col-7'>
								<Tasks
									{...this.state}
									{...this.props}
									onAction={this.handleAction}
									onRevertTaskStatus={this.handleRevertTaskStatus}
									onCompletedTaskStatus={this.handleCompletedTaskStatus}
									onDeleteTask={this.handleDeleteTask}
								/>
							</div>
						</div>
					</div>
				</Animated>
				<Modal
					{...this.state}
					{...this.props}
					onNameChange={this.handleNameChange}
					onTextChange={this.handleTextChange}
					onWysiwygChange={this.handleWysiwygChange}
					onProjectSubmit={this.handleProjectSubmit}
					onProjectEdit={this.handleProjectEdit}
					onProjectUpdate={this.handleProjectUpdate}
					onTaskSubmit={this.handleTaskSubmit}
					onDeleteAll={this.handleDelete}
					onDeleteAllTasks={this.handleDeleteTasks}
					onDeleteProject={this.handleDeleteProject}
					onTaskEdit={this.handleEditTask}
					onActionClear={this.handleClearAction}
					onTasksClear={this.props.clearTasks}
				/>
				{this.props.tasks.allCompleted && (
					<TaskCompletedModal
						{...this.props}
						{...this.state}
						onActionClear={this.handleClearAction}
						onProjectUpdate={this.handleProjectUpdate}
					/>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
		projects: state.projects,
		tasks: state.tasks,
		errors: state.errors,
	};
}

export default connect(
	mapStateToProps,
	{
		deleteUser,
		getProjects,
		getTasks,
		createProject,
		deleteProjects,
		deleteProject,
		updateProject,
		editProject,
		createTask,
		deleteTasks,
		deleteTask,
		editTask,
		clearTasks,
		resetTasks,
		sendError,
		updateTaskStatus,
		clearErrors,
		setModalLoader,
	}
)(Dashboard);
