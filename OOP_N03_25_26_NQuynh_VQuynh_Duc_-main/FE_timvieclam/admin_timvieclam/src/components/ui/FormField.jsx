const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  options = [],
  placeholder = '',
  error = '',
  required = false,
}) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedValue = value;
    
    if (type === 'number') {
      updatedValue = value === '' ? '' : Number(value);
    } else if (type === 'checkbox') {
      updatedValue = checked;
    }
    
    onChange({ name, value: updatedValue });
  };
  
  return (
    <div className="mb-4">
      <label htmlFor={name} className="label">
        {label} {required && <span className="text-error-500">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          className={`input h-32 ${error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value || ''}
          onChange={handleChange}
          className={`input ${error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
        >
          <option value="">{placeholder || 'Select an option'}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value || (type === 'number' ? '' : '')}
          onChange={handleChange}
          placeholder={placeholder}
          className={`input ${error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
        />
      )}
      
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
    </div>
  );
};

export default FormField;