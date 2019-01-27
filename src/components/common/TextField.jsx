import React from "react";

const TextField = props => {
  const {
    name,
    placeholder,
    value,
    error,
    info,
    type,
    onChange,
    onSelect,
    disabled,
    title
  } = props;
  return (
    <div className="form-group">
      {title && <label htmlFor={title}>{title}</label>}
      <input
        type={type}
        className={error ? "is-invalid form-control" : "form-control"}
        placeholder={placeholder}
        onSelect={onSelect}
        onChange={onChange}
        name={name}
        value={value}
        disabled={disabled}
      />
      {error
        ? error && <div className="invalid-feedback">{error}</div>
        : info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
};

export default TextField;
