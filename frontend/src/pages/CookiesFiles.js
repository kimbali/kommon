import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Text from '../components/text/Text';
import Button from '../components/button/Button';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useGetLegalsQuery } from '../slices/legalsApiSlice';
import Space from '../components/space/Space';
import LegalForm from '../components/legalLinks/LegalForm';
import { useUser } from '../context/userContext';
import { useTranslation } from 'react-i18next';

function CookiesFiles() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { user } = useUser();
  const [showEditForm, setShowEditForm] = useState(false);

  const { data: legalsData, refetch: refetchLegals } = useGetLegalsQuery({});

  const handleEditForm = async () => {
    setShowEditForm(false);

    try {
      await refetchLegals();
    } catch (err) {
      toast.error(t('errorPrivacyPolicy'));
    }
  };

  return (
    <div className='absolute-right legal-page'>
      <Text isTitle>{t('cookies')}</Text>

      <Space small />

      {user?.isAdmin && (
        <div className='absolute-right-element'>
          <Button
            isPrimary
            iconLeft={faEdit}
            className='edit-button'
            onClick={() => setShowEditForm(true)}
          >
            {t('editText')}
          </Button>
        </div>
      )}

      {showEditForm && (
        <LegalForm
          onSuccess={handleEditForm}
          legalKey='cookiesFiles'
          label={t('cookies')}
        />
      )}

      <Markdown
        className='markdown-text'
        remarkPlugins={[remarkGfm]}
        components={{
          h1: 'h3',
          h2: 'h4',
        }}
      >
        {legalsData?.legals[0][lang]?.cookiesFiles}
      </Markdown>
    </div>
  );
}

export default CookiesFiles;
