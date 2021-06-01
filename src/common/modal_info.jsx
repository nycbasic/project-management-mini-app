import React from 'react';

const ModalInfo = (props) => {
	const {
		project_id = '',
		inputTitle,
		inputMessageOne = '',
		inputMessageTwo = '',
		button: { action, clear, action_name }
	} = props;
	return (
		<React.Fragment>
			<div className="modal-header">
				<h5 className="modal-title" id="exampleModalLabel">
					{inputTitle}
				</h5>
				<button type="button" className="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div className="modal-body">
				<p>{inputMessageOne}</p>
				<p>{inputMessageTwo}</p>
			</div>
			<div className="modal-footer">
				<button onClick={() => clear()} type="button" className="btn btn-danger" data-dismiss="modal" s>
					Cancel
				</button>
				<button
					onClick={project_id ? () => action(project_id) : () => action()}
					type="button"
					className="btn btn-primary"
					data-dismiss="modal"
				>
					{action_name}
				</button>
			</div>
		</React.Fragment>
	);
};

export default ModalInfo;
