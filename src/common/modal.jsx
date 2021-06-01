import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalInput from './modal_input';
import ModalInfo from './modal_info';
import Spinner from '../components/common/Spinner';
import $ from 'jquery';
import 'react-quill/dist/quill.snow.css';

class Modal extends Component {
	state = {}
	static getDerivedStateFromProps(nextProps, prevState) {
		const { name, text } = nextProps;
		if (typeof nextProps.errors === 'object' && (name.length === 0 || text.length === 0)) {
			return null;
		}
		if (typeof nextProps.errors === 'object' && name.length === 0 && text.length === 0) {
			return null;
		}
		if (typeof nextProps.errors !== 'object' && name.length > 0 && text.length > 0) {
			return null;
		}
		if (name.length > 0 || text.length > 0) {
			return null;
		}
		if (
			(typeof nextProps.errors == !'object' && name.length > 0 && text.length === 0) ||
			(typeof nextProps.errors == !'object' && name.length === 0 && text.length > 0)
		) {
			return null;
		}
		if (nextProps.loading.load.status === 'PENDING') {
			return null;
		}
		if (nextProps.loading.load.status === 'FAILED') {
			return null;
		}
		$('#exampleModal').modal('hide');
		return {};
	}

	renderModalContent = (action) => {
		const {
			name,
			errors,
			text,
			project_id,
			onNameChange,
			onProjectSubmit,
			onDeleteAll,
			onProjectUpdate,
			onTaskSubmit,
			onDeleteAllTasks,
			onProjectEdit,
			onDeleteProject,
			onTaskEdit,
			onWysiwygChange,
			onActionClear
		} = this.props;

		switch (action) {
			case 'create project':
				return (
					<ModalInput
						inputType="project"
						errors={errors}
						button={{
							action: onProjectSubmit,
							clear: onActionClear,
							action_name: 'Create Project'
						}}
						inputTitle="Create a Project"
						inputNameTitle="Name of Project"
						textFieldValue={name}
						textFieldPlaceholder="Enter a Project Name"
						onNameChange={onNameChange}
					/>
				);
			case 'create task':
				return (
					<ModalInput
						inputType="task"
						errors={errors}
						button={{
							action: onTaskSubmit,
							clear: onActionClear,
							action_name: 'Create Task'
						}}
						inputTitle="Create a Task"
						inputNameTitle="Name of Task"
						textFieldValue={name}
						textFieldPlaceholder="Enter a Task Name"
						onNameChange={onNameChange}
						inputDescTitle="Enter Your Task Descriptions"
						wysiwygValue={text}
						wysiwygPlaceholder="Please Enter a Detailed Task Desciption"
						onWysiwygChange={onWysiwygChange}
					/>
				);
			case 'delete projects':
				return (
					<ModalInfo
						inputTitle="Delete Projects"
						inputMessageOne="Are you sure you want to delete all your projects?"
						button={{
							action: onDeleteAll,
							clear: onActionClear,
							action_name: 'Continue'
						}}
					/>
				);
			case 'delete project':
				return (
					<ModalInfo
						project_id={project_id}
						inputTitle="Delete Project"
						inputMessageOne="Are you sure you want to delete this project? All task created in this project will be deleted"
						button={{
							action: onDeleteProject,
							clear: onActionClear,
							action_name: 'Continue'
						}}
					/>
				);
			case 'delete tasks':
				return (
					<ModalInfo
						project_id={project_id}
						inputTitle="Delete Tasks"
						inputMessageOne="Are you sure you want to delete all you tasks?"
						button={{
							action: onDeleteAllTasks,
							clear: onActionClear,
							action_name: 'Continue'
						}}
					/>
				);
			case 'edit project':
				return (
					<ModalInput
						project_id={project_id}
						errors={errors}
						inputType="project"
						inputTitle="Edit Project Name"
						inputTitleName="Rename Your Project"
						onNameChange={onNameChange}
						textFieldValue={name}
						button={{
							action: onProjectEdit,
							clear: onActionClear,
							action_name: 'Submit'
						}}
					/>
				);
			case 'edit task':
				return (
					<ModalInput
						errors={errors}
						inputType="task"
						inputTitle="Edit a Task"
						inputTitleName="Edit The Name of The Task"
						onNameChange={onNameChange}
						textFieldValue={name}
						textFieldPlaceholder="Enter the new name of the task"
						inputDescTitle="Edit The Details of The Task"
						onWysiwygChange={onWysiwygChange}
						wysiwygValue={text}
						wysiwygPlaceholder="Enter the new details of your task"
						button={{
							action: onTaskEdit,
							clear: onActionClear,
							action_name: 'Submit'
						}}
					/>
				);
			case 'complete projects':
				return (
					<ModalInfo
						project_id={project_id}
						inputTitle="Mark Project Complete"
						inputMessageOne="All tasks are marked completed, would you like to mark your project as completed?"
						inputMessageTwo="All tasks within the project will be marked complete and cannot be reverted back to its previous status and edited."
						button={{
							action: onProjectUpdate,
							clear: onActionClear,
							action_name: 'Continue'
						}}
					/>
				);
			default:
				return null;
		}
	};

	render() {
		const { action } = this.props;
		if (this.props.loading.load.status === 'FAILED') {
		}
		return (
			<div
				className="modal fade"
				id="default-modal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				{this.props.loading.load.modal && (
					<div className="loader">
						<Spinner />
					</div>
				)}
				<div className="modal-dialog" role="document">
					<div className="modal-content">{this.renderModalContent(action)}</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		loading: state.loading
	};
}

export default connect(mapStateToProps)(Modal);
