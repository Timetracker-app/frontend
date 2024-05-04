const FormInput = ({ label, name, type, defaultValue, size }) => {
  return (
    <div className="form">
      <label className="form-label">
        <span>{label}</span>
      </label>
      <input type={type} name={name} defaultValue={defaultValue} />
    </div>
  );
};

export default FormInput;
