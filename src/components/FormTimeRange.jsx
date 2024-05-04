const FormTimeRange = ({ label, name, defaultValue }) => {
  return (
    <div className="form">
      <label className="form-label" htmlFor={name}>
        <span>{label}</span>
      </label>
      <input type="date" id={name} name={name} defaultValue={defaultValue} />
    </div>
  );
};

export default FormTimeRange;
