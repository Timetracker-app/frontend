const FormCheckbox = ({ label, name, defaultValue }) => {
  return (
    <div className="form-control items-center">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input type="checkbox" name={name} defaultChecked={defaultValue} />
    </div>
  );
};
export default FormCheckbox;
