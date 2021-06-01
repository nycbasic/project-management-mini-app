import React from "react";
import ProjectShimmer from "./common/Projects-Shimmer";

const InProgress = props => {
  const {
    onAction,
    onProjectClick,
    projects: { projects, loading },
    project_name
  } = props;

  const inProgress = projects.filter(item =>
    item.todos.length > 0 && !item.completed ? item : null
  );

  return (
    <React.Fragment>
      <h6>Projects In Progress: {inProgress.length}</h6>
      <div className="card projects">
        <div className="card-header">In Progress</div>

        <ul
          className="list-group list-group-flush"
          id="list-tab"
          role="tablist"
        >
          {loading && inProgress.length === 0 ? (
            <ProjectShimmer />
          ) : inProgress.length < 1 ? (
            <p>No projects to display</p>
          ) : (
            inProgress.map(item => {
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
                        name={project_name}
                        onClick={() => onProjectClick(item._id, item.name)}
                        className={project_name === item.name ? "active" : ""}
                        id="list-home-list"
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
                          onClick={() =>
                            onAction("complete projects", item._id)
                          }
                          //
                        >
                          {!item.completed && "Mark as Completed"}
                        </button>
                        <button
                          className="dropdown-item"
                          type="button"
                          data-toggle="modal"
                          data-target="#default-modal"
                          onClick={() =>
                            onAction("edit project", item._id, null, item.name)
                          }
                        >
                          Edit
                        </button>
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

export default InProgress;
