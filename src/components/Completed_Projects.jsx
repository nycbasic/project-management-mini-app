import React from "react";
import ProjectShimmer from "./common/Projects-Shimmer";

const CompleteProjects = props => {
  const {
    onAction,
    onProjectClick,
    projects: { projects, loading },
    project_name
  } = props;
  const completed = projects.filter(item => item.completed);

  return (
    <React.Fragment>
      <h6>Projects Completed: {completed.length}</h6>
      <div className="card projects">
        <div className="card-header">Completed</div>
        <ul
          className="list-group list-group-flush"
          id="list-tab"
          role="tablist"
        >
          {loading && completed.length === 0 ? (
            <ProjectShimmer />
          ) : completed.length < 1 ? (
            <p>No projects to display</p>
          ) : (
            completed.map(item => {
              return (
                <li
                  key={item._id}
                  className={
                    project_name === item.name
                      ? "list-group-item active"
                      : "list-group-item"
                  }
                >
                  <div className="row">
                    <div className="col-8">
                      <a
                        name={item._id}
                        onClick={() => onProjectClick(item._id, item.name)}
                        id="list-home-list"
                        className={project_name === item.name ? "active" : ""}
                        data-toggle="list"
                        href="#list-home"
                        role="tab"
                        aria-controls="home"
                      >
                        {item.name}
                      </a>
                    </div>
                    <div className="dropdown col-4">
                      <i
                        onClick={() => onProjectClick(item._id, item.name)}
                        className="far fa-caret-square-down"
                        id="dropdownMenu2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      />
                      <div
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenu2"
                      >
                        <button
                          className="dropdown-item"
                          type="button"
                          data-toggle="modal"
                          data-target="#default-modal"
                          onClick={() => onAction("delete project", item._id)}
                        >
                          Delete
                        </button>
                      </div>
                      <span
                        className={`badge badge-${
                          item.completed
                            ? "success"
                            : item.todos.length === 0
                            ? "info"
                            : "danger"
                        }`}
                      >
                        {item.completed
                          ? "Completed"
                          : item.todos.length === 0
                          ? "New Project"
                          : "In Progress..."}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default CompleteProjects;
