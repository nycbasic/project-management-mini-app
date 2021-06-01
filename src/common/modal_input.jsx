import React from "react";
import ReactQuill from "react-quill";

const ModalInput = props => {
  const {
    project_id = "",
    errors,
    inputType,
    button: { action, clear, action_name },
    inputTitle,
    inputNameTitle,
    inputDescTitle,
    onNameChange,
    textFieldValue,
    textFieldPlaceholder,
    onWysiwygChange,
    wysiwygValue,
    wysiwygPlaceholder
  } = props;

  /*
  With the different modal types, create a function that will take in the type as an input and depending on the input time will return a boolean value.
  */
  const isTaskInput = input => {
    switch (input) {
      case "task":
        return true;
      default:
        return false;
    }
  };
  /* End */

  return (
    <React.Fragment>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          {inputTitle}
        </h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">{inputNameTitle}</label>
            <input
              onChange={onNameChange}
              value={textFieldValue}
              type="text"
              className={`${errors.name && "is-invalid"} form-control`}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder={textFieldPlaceholder}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          {isTaskInput(inputType) && (
            <React.Fragment>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  {inputDescTitle}
                </label>
                <ReactQuill
                  value={wysiwygValue}
                  onChange={onWysiwygChange}
                  placeholder={wysiwygPlaceholder}
                />
              </div>
              {errors.text && <label className="error">{errors.text}</label>}
            </React.Fragment>
          )}
        </form>
      </div>
      <div className="modal-footer">
        <button
          onClick={() => clear()}
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Cancel
        </button>
        <button
          onClick={project_id ? () => action(project_id) : () => action()}
          type="button"
          className="btn btn-primary"
        >
          {action_name}
        </button>
      </div>
    </React.Fragment>
  );
};

export default ModalInput;
