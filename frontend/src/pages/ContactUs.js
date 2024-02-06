import React, { useState } from 'react';
import Text from '../components/text/Text';
import { useTranslation } from 'react-i18next';
import Space from '../components/space/Space';
import Input from '../components/input/Input';
import contactUsValidator from '../utils/validators/contactUsValidator';
import Button from '../components/button/Button';
import { useSendEmailMutation } from '../slices/emailApiSlice';

function ContactUs() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState();
  const [invalidFields, setInvalidFields] = useState('');

  const [sendEmail] = useSendEmailMutation();

  const handleOnChange = ({ value, name }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    setInvalidFields('');

    const errors = contactUsValidator({ ...formData });

    setInvalidFields(errors);

    if (errors) return null;

    try {
      await sendEmail({
        from: 'Body Maraton <onboarding@resend.dev>',
        to: 'kimgarcianton@hotmail.com',
        subject: 'Usuario contactando con administración',
        html: `
            <body style="text-align: center; background-color: #201d2b; color: #ffffff; padding: 20px; font-family: 'Arial', sans-serif;">
              <h1 style="color: #ef0482;">Body Maraton</h1>
              <h2>Mensaje del usuario</h2>
              <p>${formData.email}</p>
              <p>${formData.message}</p>
            </body>
        `,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form
      className='half-page-width background-2 no-margin'
      onSubmit={handleOnSubmit}
    >
      <Text isTitle>{t('contactUs')}</Text>

      <Space medium />

      <Input
        label={t('email')}
        placeholder={t('emailPlaceholder')}
        name='email'
        onChange={handleOnChange}
        value={formData?.email}
        error={{ invalidFields, message: t('required') }}
      />

      <Space small />

      <Input
        label={t('message')}
        type='textarea'
        name='message'
        onChange={handleOnChange}
        value={formData?.message}
        error={{ invalidFields, message: t('required') }}
      />

      <Space medium />

      <Button type='submit' isPrimary big center>
        {t('send')}
      </Button>
    </form>
  );
}

export default ContactUs;
