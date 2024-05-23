import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { useUploadRecipeImageMutation } from '../../slices/imagesApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDeleteLeft,
  faEye,
  faEyeSlash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Text from '../text/Text';
import Spinner from '../spinner/Spinner';
import Button from '../button/Button';
import { useTranslation } from 'react-i18next';
import Toggle from 'react-toggle';
import ReactCountryFlag from 'react-country-flag';
import CAT_FLAG from '../../styles/assets/cat-flag.png';

function Input({
  className = '',
  defaultValue,
  error,
  icon,
  id = '',
  imageIsLoading = false,
  isMultiSelect = false,
  isSingleSelect = false,
  keyValue = '',
  label,
  subLabel = '',
  maxLength,
  name = '',
  isArray = false,
  noValueOption = '',
  onChange,
  onCreateOption,
  options = [],
  placeholder,
  required,
  selectCreatable = false,
  selectedOption,
  selectOption = 'select one',
  type: typeParams = '',
  value = '',
  labelLink = '',
  disabled = false,
  language = '',
  trashClick,
  isClearable = false,
}) {
  const animatedComponents = useMemo(() => makeAnimated(), []);

  const { t } = useTranslation();
  const hasError = error?.invalidFields?.includes(name);
  const [uploadRecipeImage, { isLoading }] = useUploadRecipeImageMutation();
  const [fileName, setFileName] = useState(value?.originalname);
  const [type, setCurrentType] = useState(typeParams);

  const togglePasswordType = () => {
    setCurrentType(prev => (prev === 'password' ? 'text' : 'password'));
  };

  const handleOnChange = event => {
    onChange({
      language,
      isArray,
      name: event.target.name,
      value:
        type === 'number'
          ? event.target.value
          : type === 'file'
          ? event.target.files[0]
          : type === 'checkbox' || type === 'toggle'
          ? event.target.checked
          : name === 'email'
          ? event.target.value.toLowerCase()
          : event.target.value,
    });
  };

  const handleMultiSelectChange = values => {
    onChange({ name, value: values.map(each => each.value) });
  };

  const handleSingleSelectChange = element => {
    if (!element) {
      onChange();
      return;
    }
    const { value, label } = element;
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

  const flag =
    language === 'ca' ? (
      <img className='emojiFlag' src={CAT_FLAG} alt='Bandera de catalunya' />
    ) : (
      <ReactCountryFlag
        className='emojiFlag'
        countryCode='ES'
        aria-label='Spanish'
        svg
      />
    );

  return (
    <div className='input-wrapper'>
      <div className={`field ${className} ${name} ${type}`}>
        {label && (
          <div className='label-wrapper'>
            <label className='main-label' htmlFor={name}>
              {label} {selectCreatable ? t('writeNameToCreate') : ''}{' '}
              {language && flag}
            </label>

            {subLabel && <Text className='sublabel'>{subLabel}</Text>}
          </div>
        )}

        {type !== 'select' &&
          type !== 'textarea' &&
          type !== 'radio' &&
          type !== 'toggle' &&
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
              placeholder={type === 'number' ? '0' : placeholder}
              required={required}
              type={type || 'text'}
              maxLength={maxLength}
              className={`${value ? 'has-value' : 'no-value'} ${
                hasError ? 'has-error' : ''
              }`}
              checked={!!value}
              disabled={disabled}
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

        {isSingleSelect && (
          <Select
            components={animatedComponents}
            className={`multi-select ${
              defaultValue ? 'has-value' : 'no-value'
            }`}
            isClearable={isClearable}
            closeMenuOnSelect
            options={options}
            onChange={handleSingleSelectChange}
            placeholder={placeholder}
            classNamePrefix='multi-prefix'
            defaultValue={defaultValue}
            value={selectedOption}
            menuPortalTarget={document.body}
            // menuPosition={'fixed'}
            styles={{
              menuPortal: provided => ({ ...provided, zIndex: 9999 }),
              menu: provided => ({
                ...provided,
                zIndex: 9999,
                color: '#464545',
              }),
            }}
          />
        )}

        {isMultiSelect && (
          <Select
            components={animatedComponents}
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

        {selectCreatable && (
          <CreatableSelect
            components={animatedComponents}
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

        {type === 'toggle' && (
          <Toggle
            id={name}
            name={name}
            checked={value}
            onChange={handleOnChange}
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
            <div className='dots-spinner-wrapper'>
              <Spinner type='dots' />
            </div>
          ) : (
            <div className='input-file'>
              <Text className={value ? 'has-value' : 'placeholder'}>
                {isLoading
                  ? t('loading')
                  : fileName
                  ? fileName
                  : placeholder
                  ? placeholder
                  : t('imageLoad')}
              </Text>
              <Text>
                <FontAwesomeIcon icon={faPlus} />
              </Text>
            </div>
          ))}

        {hasError && <Text error>{error?.message}</Text>}
      </div>

      {typeParams === 'password' && (
        <Button
          className='password-cta'
          onClick={togglePasswordType}
          iconLeft={type === 'password' ? faEyeSlash : faEye}
        />
      )}

      {!!trashClick && isClearable && (
        <Button
          className={`trash-input ${value || selectedOption ? 'active' : ''}`}
          onClick={trashClick}
          iconLeft={faDeleteLeft}
          onlyIcon
        />
      )}
    </div>
  );
}

export default Input;
