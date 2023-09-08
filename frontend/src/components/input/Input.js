import React from 'react';
import Text from '../text/Text';

function Input({
  label,
  placeholder,
  onChange,
  icon,
  value = '',
  options = [],
  selectOption = 'select one',
  isSelect = false,
  id = '',
  name = '',
  required,
  type,
  maxLength,
  className = '',
  error,
}) {
  const handleOnChange = event => {
    onChange({
      name: event.target.name,
      value: type === 'checkbox' ? event.target.checked : event.target.value,
      files: event.target.files,
    });
  };

  return (
    <div className={`field ${id} ${type}`}>
      <label htmlFor={name}>{label}</label>

      {!isSelect && (
        <input
          id={name}
          name={name}
          value={
            type === 'file'
              ? ''
              : type === 'date' && value
              ? new Date(value).toISOString().split('T')[0]
              : value
          }
          onChange={handleOnChange}
          placeholder={placeholder}
          required={required}
          type={type || 'text'}
          maxLength={maxLength}
          className={`className ${value ? 'has-value' : 'no-value'}`}
        />
      )}

      {isSelect && (
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleOnChange}
          required={required}
          className={`className ${value ? 'has-value' : 'no-value'}`}
        >
          <option value=''>{selectOption}</option>

          {options.map((eachOption, index) => (
            <option
              key={`option-${index}`}
              value={eachOption.value}
              disabled={eachOption.disabled}
            >
              {eachOption.name}
            </option>
          ))}
        </select>
      )}

      {type === 'file' && (
        <div className='input-file'>
          <Text small className={value.name ? 'has-value' : 'placeholder'}>
            {value?.name || 'Nada subido'}
          </Text>
          <Text small>Subir una foto</Text>
        </div>
      )}

      {error && <Text danger>{error}</Text>}
    </div>
  );
}

export default Input;
