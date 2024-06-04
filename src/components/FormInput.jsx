import { useState } from "react";

const FormInput = ({
  label,
  name,
  type,
  value,
  size,
  onChange,
  disabled,
  defaultValue,
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`input input-bordered ${size}`}
        required
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default FormInput;
