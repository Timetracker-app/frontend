import { useState } from "react";

const FormCheckbox = ({ label, name, checked, onChange }) => {
  return (
    <div className="form-control items-center">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <input type="hidden" name={name} value={checked} />
    </div>
  );
};
export default FormCheckbox;
