import React, { useState } from 'react';
import {
  useCreateMarathonMutation,
  useDeleteMarathonMutation,
  useUpdateMarathonMutation,
} from '../../slices/marathonApiSlice';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import Button from '../button/Button';
import ConfirmModal from '../modal/ConfirmModal';
import toast from 'react-hot-toast';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { addOneMonth } from '../../utils/formatDate';

function NewMarathonForm({ onSucces, onCancel, marathon }) {
  const [formData, setFormData] = useState(marathon);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [createMarathon] = useCreateMarathonMutation();
  const [updateMarathon] = useUpdateMarathonMutation();
  const [deleteMarathon] = useDeleteMarathonMutation();

  const handleOnChange = ({ name, value }) => {
    if (name === 'startDate') {
      setFormData({ ...formData, [name]: value, endDate: addOneMonth(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(false);

    if (!formData.startDate || !formData.endDate || !formData.name) {
      return setError(true);
    }

    if (marathon) {
      const res = await updateMarathon(formData).unwrap();
      onSucces(res);
      toast.success(`${formData.name} updated`);
    } else {
      const res = await createMarathon(formData).unwrap();
      onSucces(res);
      toast.success(`${formData.name} created`);
    }
  };

  const deleteHandler = async () => {
    await deleteMarathon(formData._id);
    toast.succes('Marathon deleted');
    setShowDeleteModal(false);
    onSucces();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text isTitle>
        {marathon ? 'Update marathon' : 'Create new marathon'}
      </Text>

      <Space medium />

      <Input
        label='Marathon name'
        placeholder='A title for this marahton'
        name='name'
        onChange={handleOnChange}
        value={formData?.name}
      />

      <Space small />

      <div className='grid-container'>
        <Input
          className='cols-2'
          label='start date'
          name='startDate'
          type='date'
          onChange={handleOnChange}
          value={formData?.startDate}
        />

        <Input
          className='cols-2'
          label='end date'
          name='endDate'
          type='date'
          onChange={handleOnChange}
          value={formData?.endDate}
        />
      </div>

      <Space medium />

      {error && <Text danger>All are required fields</Text>}

      <Space big />

      <div className='content-left-and-right'>
        <Button
          onClick={() => setShowDeleteModal(true)}
          isSecondary
          iconLeft={faTrash}
        >
          Delete marathon
        </Button>

        <div className='content-on-the-right'>
          <Button type='submit' isPrimary>
            {marathon ? 'Update' : 'Create'} marathon
          </Button>
        </div>
      </div>

      {showDeleteModal && (
        <ConfirmModal
          onConfirm={deleteHandler}
          onClose={setShowDeleteModal}
          title='Delete recipe'
          text={`Are you sure you whant to delete: ${formData?.name}`}
        />
      )}
    </form>
  );
}

export default NewMarathonForm;
