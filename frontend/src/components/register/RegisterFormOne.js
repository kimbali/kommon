import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import registerValidator from '../../utils/validators/registerValidator';
import toast from 'react-hot-toast';
import Button from '../button/Button';
import frontRoutes from '../../config/frontRoutes';
import { useGetRegionsQuery } from '../../slices/regionsApiSlice';
import { useTranslation } from 'react-i18next';

function RegisterFormOne({ onSuccess, giftSelected, userData, hasGift }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...userData });
  const [selectedCity, setSelectedCity] = useState();
  const [invalidFields, setInvalidFields] = useState('');
  const [regionOptions, setRegionOptions] = useState();

  const { data: regionsData } = useGetRegionsQuery({});

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (regionsData) {
      const regionsList = regionsData.regions.map(ele => {
        return { label: ele.region, value: ele._id };
      });

      setRegionOptions(regionsList);
    }
  }, [regionsData]);

  useEffect(() => {
    if (userData && regionOptions) {
      setSelectedCity(
        regionOptions.find(ele => ele.value === userData.city?._id)
      );
    }
  }, [regionOptions]);

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCityChange = ({ value, label }) => {
    setSelectedCity({ label, value });
    setFormData({ ...formData, city: value });
  };

  const handlePayNow = e => {
    e.preventDefault();

    let errors = [];
    errors = errors.concat(registerValidator(1, formData));

    if (!userData) {
      errors = errors.concat(registerValidator(11, formData));
    }

    if (hasGift && !userData) {
      errors = errors.concat(registerValidator(12, formData));

      if (!giftSelected) {
        errors = errors.concat('selectGift');
      }
    }

    setInvalidFields(errors);

    if (errors.length > 0) {
      return;
    }

    if (!userData || userData.createdByAdmin) {
      const { password, confirmPassword } = formData;

      if (password !== confirmPassword) {
        toast.error(t('noPasswordMatch'));
        return;
      }

      navigate(frontRoutes.payment, { state: { ...formData, giftSelected } });
    } else {
      onSuccess(2);
    }
  };

  return (
    <div>
      <form onSubmit={handlePayNow} className='personal-info-form'>
        <Text isTitle>{t('generalInfo')}</Text>

        <Text fontSize='18'>{t('tellUsMoreAboutYou')}</Text>

        <Space medium />

        <Input
          label={t('email')}
          name='email'
          placeholder={t('emailPlaceholder')}
          onChange={handleOnChange}
          value={formData.email}
          error={{ invalidFields, message: t('emailRequired') }}
          disabled={!!userData}
        />

        <Space small />

        <Input
          label={t('name')}
          name='name'
          placeholder={t('userNameComplete')}
          onChange={handleOnChange}
          value={formData.name}
          error={{ invalidFields, message: t('nameRequired') }}
        />

        <Space small />

        <Input
          label={t('phone')}
          name='phone'
          placeholder={t('phonePlaceholder')}
          onChange={handleOnChange}
          value={formData.phone}
          error={{
            invalidFields,
            message: t('phoneRequired'),
          }}
        />

        <Space small />

        {hasGift && (
          <Input
            label={t('regionLabel')}
            placeholder={t('selectRegion')}
            options={regionOptions}
            onChange={handleCityChange}
            selectedOption={selectedCity}
            isSingleSelect
            name='city'
            error={{ invalidFields, message: t('regionRequired') }}
          />
        )}

        {!userData && hasGift && (
          <>
            <Space small />

            <Input
              label={`${t('sendAddress')} ${
                !giftSelected ? t('selectAGift') : ''
              }${t('requiredLabel')}`}
              name='address'
              placeholder={t('completeAddress')}
              onChange={handleOnChange}
              value={formData.address}
              error={{
                invalidFields,
                message: t('addressRequired'),
              }}
            />
          </>
        )}

        {!userData && (
          <>
            <Space small />

            <Input
              type='password'
              label={t('password')}
              name='password'
              placeholder={t('passwordPlaceholder')}
              onChange={handleOnChange}
              value={formData.password}
              error={{ invalidFields, message: 'Password field required' }}
            />

            <Space small />

            <Input
              type='password'
              label={t('confirmPassword')}
              name='confirmPassword'
              placeholder={t('passwordPlaceholder')}
              onChange={handleOnChange}
              value={formData.confirmPassword}
              error={{
                invalidFields,
                message: t('confirmPasswordRequired'),
              }}
            />
          </>
        )}

        {!userData && (
          <>
            <Space medium />

            <Input
              name='termsAndConditions'
              type='checkbox'
              className={formData.termsAndConditions ? 'checked' : ''}
              label={
                <Text>
                  {t('iveRead')}
                  <Link target='is_blank' to={frontRoutes.terms}>
                    {t('termsAndConditions')}
                  </Link>
                </Text>
              }
              value={formData.termsAndConditions}
              onChange={handleOnChange}
            />

            <Input
              name='privacyPolicy'
              type='checkbox'
              className={formData.privacyPolicy ? 'checked' : ''}
              label={
                <Text>
                  {t('iveReadThe')}
                  <Link target='is_blank' to={frontRoutes.privacyPolicy}>
                    {t('privacyPolicy')}
                  </Link>
                </Text>
              }
              value={formData.privacyPolicy}
              onChange={handleOnChange}
            />
          </>
        )}

        <Space big />

        <Button
          type='submit'
          isPrimary
          big
          center
          disabled={
            (!userData &&
              (!formData.termsAndConditions || !formData.privacyPolicy)) ||
            (!userData && hasGift && !giftSelected)
          }
        >
          {userData ? t('continue') : `${t('pay')} 29,90€`}
        </Button>

        <Space medium />

        {!userData && hasGift && !giftSelected && (
          <>
            <Space medium />

            <Text center error fontSize='16'>
              {t('selectAGift')}
            </Text>
          </>
        )}

        <Space medium />
      </form>
    </div>
  );
}

export default RegisterFormOne;
