import { useState } from "react";

const FormInput = ({ label, name, type, value, size, onChange, disabled }) => {
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
      />
    </div>
  );
};

export default FormInput;
