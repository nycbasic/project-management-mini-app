import React from 'react';
import ReactMarkdown from 'react-markdown';
import TasksShimmer from './common/Tasks-Shimmer';

const Tasks = (props) => {
	const {
		onAction,
		onCompletedTaskStatus,
		onRevertTaskStatus,
		onDeleteTask,
		tasks: { tasks, loading },
		project_id,
		project_name,
		projects: { projects },
	} = props;

	// Checks if a project is marked completed
	const projectCompleted = projects.some((project) => {
		return project._id === project_id && project.completed === true;
	});

	return (
		<React.Fragment>
			<h6>You're viewing: {project_name}</h6>
			<div className='card'>
				{/* The card header wrapper that includes the ability to delete all task and create a new task within a project */}
				<div className='card-header'>
					Tasks
					{projectCompleted ? null : (
						<i
							onClick={() => onAction('create task', project_id)}
							className={`fas fa-plus ${project_id ? 'show' : 'hide'}`}
							data-toggle='modal'
							data-target='#default-modal'
						/>
					)}
					{tasks.length < 1 || projectCompleted ? null : (
						<i
							onClick={() => onAction('delete tasks', project_id)}
							className={`fas fa-trash-alt ${project_id ? 'show' : 'hide'}`}
							data-toggle='modal'
							data-target='#default-modal'
						/>
					)}
				</div>
				{/* Header End */}
				<div className='card-body'>
					{loading && tasks.length === 0 ? (
						<TasksShimmer />
					) : tasks.length === 0 ? (
						<p className='task-default-msg'>
							Create a Task or Select a Project
						</p>
					) : (
						tasks.length > 0 && (
							<div className='accordion' id='accordionExample'>
								{tasks.map((task, index) => {
									return (
										<div className='card tasks' key={`tasks-${index}`}>
											<div className='card-header' id={`heading-${index}`}>
												<div className='row'>
													<div className='col-10'>
														<h2 className='mb-0'>
															<button
																className='btn btn-link'
																type='button'
																data-toggle='collapse'
																data-target={`#collapse-${index}`}
																aria-expanded='true'
																aria-controls='collapseOne'
															>
																{task.name}
															</button>
														</h2>
													</div>
													<div className='icons-status col-2'>
														<div
															className={
																task.completed
																	? 'status status-completed'
																	: 'status'
															}
														>
															<span
																className={`badge badge-${
																	task.completed ? 'success' : 'danger'
																}`}
															>
																{task.completed
																	? 'Completed'
																	: 'In Progress...'}
															</span>
														</div>

														{projectCompleted ? null : (
															<div className='icons'>
																<ul className='nav'>
																	<React.Fragment>
																		<li
																			onClick={
																				task.completed
																					? () =>
																							onRevertTaskStatus(
																								project_id,
																								task._id
																							)
																					: () =>
																							onCompletedTaskStatus(
																								project_id,
																								task._id
																							)
																			}
																			className='nav-item'
																		>
																			{task.completed ? (
																				<i
																					className='fas fa-undo'
																					title='Revert'
																				/>
																			) : (
																				<i
																					className='far fa-check-square'
																					title='Completed'
																				/>
																			)}
																		</li>
																		{task.completed ? (
																			''
																		) : (
																			<li
																				onClick={() =>
																					onAction(
																						'edit task',
																						project_id,
																						task._id,
																						task.name,
																						task.text
																					)
																				}
																				className='nav-item'
																				data-toggle='modal'
																				data-target='#default-modal'
																			>
																				<i
																					className='far fa-edit'
																					title='Edit'
																				/>
																			</li>
																		)}

																		<li
																			onClick={() =>
																				onDeleteTask(project_id, task._id)
																			}
																			className='nav-item'
																		>
																			<i
																				className='far fa-trash-alt'
																				title='Delete'
																			/>
																		</li>
																	</React.Fragment>
																</ul>
															</div>
														)}
													</div>
												</div>
											</div>

											<div
												id={`collapse-${index}`}
												className='collapse'
												aria-labelledby={`heading-${index}`}
												data-parent='#accordionExample'
											>
												<div className='card-body'>
													<ReactMarkdown
														source={task.text}
														escapeHtml={false}
													/>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						)
					)}
				</div>
			</div>
		</React.Fragment>
	);
};
export default Tasks;
