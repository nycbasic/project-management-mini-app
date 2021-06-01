import React from 'react';
import Spinner from '../components/common/Spinner';
import ModalInfo from '../common/modal_info';
import { connect } from 'react-redux';

const modalCompletedTasks = (props) => {
	const { project_id, onProjectUpdate, onActionClear } = props;
	return (
		<div
			className="modal fade"
			id="task-completed-modal"
			tabIndex="-1"
			role="dialog"
			aria-labelledby="task-completed-modal"
			aria-hidden="true"
		>
			{props.loading.load.modal && (
				<div className="loader">
					<Spinner />
				</div>
			)}
			<div className="modal-dialog" role="document">
				<div className="modal-content">
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
				</div>
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		loading: state.loading
	};
}

export default connect(mapStateToProps)(modalCompletedTasks);
