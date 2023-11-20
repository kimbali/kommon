import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useUploadRecipeImageMutation } from '../../slices/imagesApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Text from '../text/Text';
import Spinner from '../spinner/Spinner';

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
  imageIsLoading = false,
}) {
  const hasError = error?.invalidFields?.includes(name);
  const [uploadRecipeImage, { isLoading }] = useUploadRecipeImageMutation();
  const [fileName, setFileName] = useState(value?.originalname);

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
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    try {
      const res = await uploadRecipeImage(formData).unwrap();

      toast.success(res.message);

      onChange({ name, value: res.image });
      setFileName(res.image.originalname);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className={`field ${className} ${name} ${type}`}>
      {label && (
        <label className='main-label' htmlFor={name}>
          {label} {selectCreatable ? '(Escribir nombre para crear nuevo)' : ''}
        </label>
      )}

      {type !== 'select' &&
        type !== 'textarea' &&
        type !== 'radio' &&
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
            checked={!!value}
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

      {type === 'radio' &&
        options.map(option => (
          <label
            className='radio-label'
            key={`${option.value}-${name}`}
            htmlFor={`${option.value}-${name}`}
          >
            <input
              name={name}
              id={`${option.value}-${name}`}
              type='radio'
              value={option.value}
              onChange={handleOnChange}
              checked={selectedOption === option.value}
            />
            <Text isBold>
              {option.label}
              {option.sublabel && <span>{option.sublabel}</span>}
            </Text>
          </label>
        ))}

      {type === 'file' &&
        (isLoading ? (
          <Spinner type='dots' />
        ) : (
          <div className='input-file'>
            <Text className={value ? 'has-value' : 'placeholder'}>
              {isLoading
                ? 'Cargando...'
                : fileName
                ? fileName
                : 'Upload an image...'}
            </Text>
            <Text>
              <FontAwesomeIcon icon={faPlus} />
            </Text>
          </div>
        ))}

      {hasError && <Text error>{error?.message}</Text>}
    </div>
  );
}

export default Input;
