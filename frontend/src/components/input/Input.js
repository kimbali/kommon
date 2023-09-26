import React from 'react';
import Text from '../text/Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { useUploadRecipeImageMutation } from '../../slices/recipesApiSlice';

function Input({
  label,
  placeholder,
  onChange,
  icon,
  value = '',
  options = [],
  selectOption = 'select one',
  noValueOption = '',
  id = '',
  name = '',
  required,
  type = '',
  maxLength,
  error,
  className = '',
  isMultiSelect = false,
  isSingleSelect = false,
  defaultValue,
  keyValue = '',
}) {
  const [uploadRecipeImage] = useUploadRecipeImageMutation();

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

  const handleMultiSelectChange = values => {
    onChange({ name, value: values.map(each => each.value) });
  };

  const handleSingleSelectChange = ({ value }) => {
    onChange({ name, value });
  };

  const handleUploadImage = async event => {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    try {
      const res = await uploadRecipeImage(formData).unwrap();
      toast.success(res.message);

      onChange({ name, value: res.image });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className={`field ${className} ${name} ${type}`}>
      <label htmlFor={name}>{label}</label>

      {type !== 'select' &&
        type !== 'textarea' &&
        !isMultiSelect &&
        !isSingleSelect && (
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
            onChange={type === 'file' ? handleUploadImage : handleOnChange}
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
          <option value='' disabled={!noValueOption}>
            {noValueOption || selectOption}
          </option>

          {options.map((eachOption, index) => (
            <option
              key={`option-${index}`}
              value={eachOption.value}
              disabled={eachOption.disabled}
            >
              {eachOption.label}
            </option>
          ))}
        </select>
      )}

      {isMultiSelect && (
        <Select
          className='multi-select'
          closeMenuOnSelect={false}
          isMulti
          options={options}
          onChange={handleMultiSelectChange}
          placeholder={placeholder}
          classNamePrefix='multi-prefix'
          defaultValue={defaultValue}
        />
      )}

      {isSingleSelect && (
        <Select
          className='multi-select'
          closeMenuOnSelect
          options={options}
          onChange={handleSingleSelectChange}
          placeholder={placeholder}
          classNamePrefix='multi-prefix'
          defaultValue={defaultValue}
        />
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
