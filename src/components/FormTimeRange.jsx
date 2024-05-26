const FormTimeRange = ({ label, name, defaultValue }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="datetime-local"
        id={name}
        name={name}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default FormTimeRange;
