import React from 'react';
import Shimmer from 'react-shimmer-effect';
import { duplicateShimmer } from '../../helpers/shimmer-boxes';

const projectsShimmer = () => {
	const boxes = duplicateShimmer(3);
	return (
		<React.Fragment>
			<div className='project-shimmer-container'>
				<Shimmer>
					{boxes.map((item, index) => {
						return <div key={index} className='project-shimmer-rectangle' />;
					})}
				</Shimmer>
			</div>
		</React.Fragment>
	);
};

export default projectsShimmer;
