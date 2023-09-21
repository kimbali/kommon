import React from 'react';
import Text from '../text/Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Input({
  label,
  placeholder,
  onChange,
  icon,
  value = '',
  options = [],
  selectOption = 'select one',
  id = '',
  name = '',
  required,
  type = '',
  maxLength,
  error,
  className = '',
}) {
  const handleOnChange = event => {
    onChange({
      name: event.target.name,
      value:
        type === 'file'
          ? event.target.files[0]
          : type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    });
  };

  return (
    <div className={`field ${className} ${name} ${type}`}>
      <label htmlFor={name}>{label}</label>

      {type !== 'select' && type !== 'textarea' && (
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
          className={`${value ? 'has-value' : 'no-value'}`}
        />
      )}

      {type === 'select' && (
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleOnChange}
          required={required}
          className={`${value ? 'has-value' : 'no-value'}`}
        >
          <option value='' disabled>
            {selectOption}
          </option>

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

      {type === 'textarea' && (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleOnChange}
          placeholder={placeholder}
          required={required}
          className={`${value ? 'has-value' : 'no-value'}`}
        />
      )}

      {type === 'file' && (
        <div className='input-file'>
          <Text small className={value ? 'has-value' : 'placeholder'}>
            {value || 'Upload an image'}
          </Text>
          <Text small>
            <FontAwesomeIcon icon={faPlus} />
          </Text>
        </div>
      )}

      {error && <Text danger>{error}</Text>}
    </div>
  );
}

export default Input;
