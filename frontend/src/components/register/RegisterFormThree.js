import React, { useEffect, useState } from 'react';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import registerValidator from '../../utils/validators/registerValidator';
import { useProfileMutation } from '../../slices/usersApiSlices';
import toast from 'react-hot-toast';
import Button from '../button/Button';
import activityEnum from '../../config/enums/activitiesEnum';
import porpusesEnum from '../../config/enums/porpusesEnum';
import problemsEnum from '../../config/enums/problemsEnum';
import patologyEnum from '../../config/enums/patologiesEnum';
import allergiesEnum from '../../config/enums/allergiesEnum';
import yesNoEnum from '../../config/enums/yesNoEnum';
import { useTranslation } from 'react-i18next';

function RegisterFormThree({ onSuccess, userData }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ ...userData });
  const [invalidFields, setInvalidFields] = useState('');

  const [updateProfile] = useProfileMutation();

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = registerValidator(3, formData);
    setInvalidFields(errors);

    if (errors.length > 0) {
      return;
    }

    try {
      await updateProfile({ ...formData, isFullRegistered: true }).unwrap();

      onSuccess(4);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text isTitle>{t('healthAsk')}:</Text>
      <Text fontSize='18'>{t('chooseOption')}</Text>

      <Space big />

      <Input
        label={`${t('dailyActivity')}:`}
        placeholder=''
        type='radio'
        onChange={handleOnChange}
        name='activity'
        selectedOption={formData.activity}
        options={activityEnum}
        error={{ invalidFields, message: t('activityRequired') }}
      />

      <Space big />

      <Input
        label={t('yourPorpose')}
        placeholder=''
        type='radio'
        onChange={handleOnChange}
        name='porpuse'
        selectedOption={formData.porpuse}
        options={porpusesEnum}
        error={{ invalidFields, message: t('porposeRequired') }}
      />

      <Space big />

      <Input
        label={t('breastAsk')}
        placeholder=''
        type='radio'
        onChange={handleOnChange}
        name='breastfeed'
        selectedOption={formData.breastfeed}
        options={yesNoEnum}
        error={{ invalidFields, message: 'Breastfeed field required' }}
      />

      <Space big />

      <Input
        className='register'
        label={t('allergiesAsk')}
        placeholder={t('selectOneOrMore')}
        isMultiSelect
        onChange={handleOnChange}
        name='allergies'
        selectedOption={formData.allergies}
        options={allergiesEnum}
        error={{ invalidFields, message: t('allergiesRequired') }}
      />

      <Space big />

      <Input
        label={t('problemsAsk')}
        placeholder=''
        type='radio'
        onChange={handleOnChange}
        name='problems'
        selectedOption={formData.problems}
        options={problemsEnum}
        error={{ invalidFields, message: t('problemsRequired') }}
      />

      <Space big />

      <Input
        className='register'
        label={t('patologiesAsk')}
        placeholder={t('selectOneOrMore')}
        isMultiSelect
        onChange={handleOnChange}
        name='patologies'
        selectedOption={formData.patologies}
        options={patologyEnum}
        error={{ invalidFields, message: t('patologiesRequired') }}
      />

      <Space big />

      <Button type='submit' isPrimary big center>
        {t('finish')}
      </Button>

      <Space medium />
    </form>
  );
}

export default RegisterFormThree;
