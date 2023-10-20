import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
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
  selectedOption,
  noValueOption = '',
  selectCreatable = false,
  onCreateOption,
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
  const hasError = error?.invalidFields?.includes(name);
  const [uploadRecipeImage] = useUploadRecipeImageMutation();
  const [fileName, setFileName] = useState('');

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

  const handleSingleSelectChange = ({ value, label }) => {
    onChange({ name, value, label });
  };

  const handleUploadImage = async event => {
    const fileName = event.target.files[0]?.name;
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    try {
      const res = await uploadRecipeImage(formData).unwrap();
      toast.success(res.message);

      onChange({ name, value: res.image });
      setFileName(fileName);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className={`field ${className} ${name} ${type}`}>
      {label && <label htmlFor={name}>{label}</label>}

      {type !== 'select' &&
        type !== 'textarea' &&
        !isMultiSelect &&
        !isSingleSelect &&
        !selectCreatable && (
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
            className={`${value ? 'has-value' : 'no-value'} ${
              hasError ? 'has-error' : ''
            }`}
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
          className={`multi-select ${defaultValue ? 'has-value' : 'no-value'}`}
          closeMenuOnSelect
          options={options}
          onChange={handleSingleSelectChange}
          placeholder={placeholder}
          classNamePrefix='multi-prefix'
          defaultValue={defaultValue}
          value={selectedOption}
        />
      )}

      {selectCreatable && (
        <CreatableSelect
          className='multi-select'
          classNamePrefix='multi-prefix'
          onCreateOption={onCreateOption}
          onChange={handleSingleSelectChange}
          options={options}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={selectedOption}
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
          <Text className={value ? 'has-value' : 'placeholder'}>
            {fileName ? fileName : value ? 'Change file' : 'Upload an image...'}
          </Text>
          <Text>
            <FontAwesomeIcon icon={faPlus} />
          </Text>
        </div>
      )}

      {hasError && <Text danger>{error?.message}</Text>}
    </div>
  );
}

export default Input;
