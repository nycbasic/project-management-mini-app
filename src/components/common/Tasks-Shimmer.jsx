import React from 'react';
import Shimmer from 'react-shimmer-effect';
import { duplicateShimmer } from "../../helpers/shimmer-boxes";

const TasksShimmer = () => {
	const boxes = duplicateShimmer(11)
	return (
		<React.Fragment>
			<div className='task-shimmer-container'>
				<Shimmer>
					{boxes.map((item, index) => {
						return <div key={index} className="task-shimmer-rectangle" />
					})}
				</Shimmer>
			</div>
		</React.Fragment>
	);
};

export default TasksShimmer;
