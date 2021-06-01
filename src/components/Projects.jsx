import React from "react";
import ProjectShimmer from "./common/Projects-Shimmer";
import { connect } from "react-redux";

const Projects = props => {
  const {
    onAction,
    onProjectClick,
    projects: { projects, loading },
    project_name
  } = props;

  const newProjects = projects.filter(
    item => !item.completed && item.todos.length < 1
  );

  return (
    <React.Fragment>
      <h6>New Projects: {newProjects.length}</h6>
      <div className="card projects">
        <div className="card-header">
          New Projects
          <i
            onClick={() => onAction("create project")}
            className="fas fa-plus"
            data-toggle="modal"
            data-target="#default-modal"
          />
          {projects.length > 0 ? (
            <i
              onClick={() => onAction("delete projects")}
              className="fas fa-trash-alt"
              data-toggle="modal"
              data-target="#default-modal"
            />
          ) : null}
        </div>
        <ul
          className="list-group list-group-flush"
          id="list-tab"
          role="tablist"
        >
          {/* <ProjectShimmer /> */}
          {loading && newProjects.length === 0 ? (
            <ProjectShimmer />
          ) : newProjects.length < 1 ? (
            <p>No projects to display</p>
          ) : (
            newProjects.map(project => {
              return (
                <li
                  key={project._id}
                  className={
                    project_name === project.name
                      ? `list-group-item active`
                      : `list-group-item`
                  }
                >
                  <div className="row">
                    <div className="col-8">
                      <a
                        name={project_name}
                        onClick={() =>
                          onProjectClick(project._id, project.name)
                        }
                        id="list-home-list"
                        className={
                          project_name === project.name ? "active" : ""
                        }
                        data-toggle="list"
                        href="#list-home"
                        role="tab"
                        aria-controls="home"
                      >
                        {project.name}
                      </a>
                    </div>
                    <div className="dropdown col-4">
                      <i
                        onClick={() =>
                          onProjectClick(project._id, project.name)
                        }
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
                            onAction(
                              "edit project",
                              project._id,
                              null,
                              project.name
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="dropdown-item"
                          type="button"
                          data-toggle="modal"
                          data-target="#default-modal"
                          onClick={() =>
                            onAction("delete project", project._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                      <span
                        className={`badge badge-${
                          project.completed
                            ? "success"
                            : project.todos.length === 0
                            ? "info"
                            : "danger"
                        }`}
                      >
                        {project.completed
                          ? "Completed"
                          : project.todos.length === 0
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

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}

export default connect(mapStateToProps)(Projects);
