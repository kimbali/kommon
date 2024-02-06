import React, { useState } from 'react';
import Text from '../text/Text';
import { useTranslation } from 'react-i18next';
import Space from '../space/Space';
import Input from '../input/Input';
import Button from '../button/Button';
import { useUpdateConfigMutation } from '../../slices/configApiSlice';
import { useConfig } from '../../context/configContext';

function ActiveSections() {
  const { t } = useTranslation();
  const { config, updateConfig } = useConfig();

  const [formData, setFormData] = useState();
  const [showHelper, setShowHelper] = useState(false);

  const [updateConfigApi] = useUpdateConfigMutation();

  const handleOnChange = ({ value, name }) => {
    setFormData({ ...formData, [name]: value });

    setShowHelper(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setShowHelper(false);

    try {
      await updateConfigApi({ ...config, ...formData });
      updateConfig({ ...formData });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='content-left-and-right'>
        <Text isSubtitle>{t('inactiveSections')}</Text>

        <div className='helper-and-button'>
          {showHelper && <Text center>Debes guardar los camibos</Text>}

          <Button isPrimary type='submit'>
            {t('save')}
          </Button>
        </div>
      </div>

      <Space medium />

      <table className='config-table'>
        <tbody>
          <tr>
            <td>{t('meditations')}</td>

            <td className='only-icon center'>
              <Input
                type='toggle'
                name='activeMeditations'
                value={!!formData?.activeMeditations}
                onChange={handleOnChange}
              />
            </td>
          </tr>

          <tr>
            <td>{t('workoutsLevel')}</td>

            <td className='only-icon center'>
              <Input
                type='toggle'
                name='workoutsLevel'
                value={!!formData?.workoutsLevel}
                onChange={handleOnChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default ActiveSections;
