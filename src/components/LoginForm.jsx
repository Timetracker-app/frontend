import React from "react";

const LoginForm = ({ label, name, type, defaultValue }) => {
  return (
    <div>
      <label>
        <span>{label}</span>
      </label>
      <input type={type} name={name} defaultValue={defaultValue} />
    </div>
  );
};

export default LoginForm;
