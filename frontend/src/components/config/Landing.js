import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/configContext';
import { useUpdateConfigMutation } from '../../slices/configApiSlice';

function Landing() {
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
  return <form onSubmit={handleSubmit}></form>;
}

export default Landing;
