const FormSelect = ({ label, name, list, defaultValue, size }) => {
  return (
    <div className="form">
      <label htmlFor={name} className="form-label">
        <span>{label}</span>
      </label>
      <select name={name} id={name} defaultValue={defaultValue}>
        {list.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
