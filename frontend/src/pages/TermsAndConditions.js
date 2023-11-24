import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import toast from 'react-hot-toast';
import Text from '../components/text/Text';
import Button from '../components/button/Button';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useGetLegalsQuery } from '../slices/legalsApiSlice';
import Space from '../components/space/Space';
import LegalForm from '../components/legalLinks/LegalForm';

function TermsAndConditions() {
  const { userInfo } = useSelector(state => state.auth);
  const [showEditForm, setShowEditForm] = useState(false);

  const { data: legalsData, refetch: refetchLegals } = useGetLegalsQuery({});

  const handleEditForm = async () => {
    setShowEditForm(false);

    try {
      await refetchLegals();
    } catch (err) {
      toast.error('Error fetching terms');
    }
  };

  return (
    <div className='absolute-right legal-page'>
      <Text isTitle>Términos y condiciones</Text>

      <Space small />

      {userInfo?.isAdmin && (
        <div className='absolute-right-element'>
          <Button
            isPrimary
            iconLeft={faEdit}
            className='edit-button'
            onClick={() => setShowEditForm(true)}
          >
            Modificar texto
          </Button>
        </div>
      )}

      {showEditForm && (
        <LegalForm
          onSuccess={handleEditForm}
          legalKey='termsAndConditions'
          label='Términos y condiciones'
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
        {legalsData?.legals[0].termsAndConditions}
      </Markdown>
    </div>
  );
}

export default TermsAndConditions;
