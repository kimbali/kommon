import React, { useEffect, useState } from 'react';
import {
  useCreateMarathonMutation,
  useDeleteMarathonMutation,
  useUpdateMarathonMutation,
} from '../../slices/marathonApiSlice';
import {
  useCreatePlanningMutation,
  useGetPlanningsQuery,
} from '../../slices/planningsApiSlice';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import Button from '../button/Button';
import ConfirmModal from '../modal/ConfirmModal';
import toast from 'react-hot-toast';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { addOneMonth } from '../../utils/formatDate';
import { useTranslation } from 'react-i18next';

function MarathonForm({ onSucces, onCancel, marathon }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(marathon);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [planningsOptions, setPlanningsOptions] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState();

  const [createMarathon] = useCreateMarathonMutation();
  const [updateMarathon] = useUpdateMarathonMutation();
  const [deleteMarathon] = useDeleteMarathonMutation();

  const { data: plansData, refetch: refetchPlans } = useGetPlanningsQuery({});

  const [createPlan] = useCreatePlanningMutation();

  useEffect(() => {
    if (plansData && plansData.plannings.length > 0) {
      const options = plansData.plannings.map(ele => {
        return { label: ele.name, value: ele._id };
      });

      setPlanningsOptions(options);

      if (marathon) {
        const currentPlan = plansData.plannings.find(
          ele => ele._id === marathon.planning._id
        );

        setSelectedPlan({ label: currentPlan?.name, value: marathon.planning });
      }
    }
  }, [plansData, marathon]);

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

    if (
      !formData ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.name ||
      !formData.planning
    ) {
      return setError(true);
    }

    if (marathon) {
      const res = await updateMarathon(formData).unwrap();
      toast.success(`${formData.name} updated`);
      onSucces(res);
    } else {
      const res = await createMarathon(formData).unwrap();
      toast.success(`${formData.name} created`);
      onSucces(res);
    }
  };

  const handleDeleteMarathon = async () => {
    await deleteMarathon(formData._id);
    toast.success(t('marathonDeleted'));
    setShowDeleteModal(false);
    onSucces();
  };

  const handleCreatePlanning = async planName => {
    const newPlan = await createPlan({ name: planName });

    setSelectedPlan({ label: planName, value: newPlan.data._id });
    handleOnChange({ name: 'planning', value: newPlan.data._id });

    await refetchPlans();
  };

  const handleSelectPlan = ({ name, value }) => {
    const currentPlan = plansData.plannings.find(ele => ele._id === value);

    setSelectedPlan({ label: currentPlan.name, value });
    handleOnChange({ name, value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text isTitle>
        {marathon ? 'Update marathon' : 'Create new marathon'}
      </Text>

      <Space medium />

      <Input
        label='Marathon name'
        placeholder='A name for this new marahton'
        name='name'
        onChange={handleOnChange}
        value={formData?.name}
      />

      <Space small />

      <Input
        label='Marathon plan'
        placeholder='Select a plan or introduce a new name'
        options={planningsOptions}
        onChange={handleSelectPlan}
        selectedOption={selectedPlan}
        name='planning'
        selectCreatable
        onCreateOption={handleCreatePlanning}
      />

      <Space small />

      <Input
        label='start date'
        name='startDate'
        type='date'
        onChange={handleOnChange}
        value={formData?.startDate}
      />

      <Space small />

      <Input
        label='end date'
        name='endDate'
        type='date'
        onChange={handleOnChange}
        value={formData?.endDate}
      />

      <Space medium />

      {error && <Text danger>All are required fields</Text>}

      <Space big />

      <div
        className={marathon ? 'content-left-and-right' : 'content-on-the-right'}
      >
        {marathon && (
          <Button
            onClick={() => setShowDeleteModal(true)}
            isSecondary
            iconLeft={faTrash}
          >
            Delete marathon
          </Button>
        )}

        <div className='content-on-the-right'>
          <Button type='submit' isPrimary>
            {marathon ? 'Update' : 'Create'} marathon
          </Button>
        </div>
      </div>

      {showDeleteModal && (
        <ConfirmModal
          onConfirm={handleDeleteMarathon}
          onClose={setShowDeleteModal}
          title='Delete recipe'
          text={`Are you sure you whant to delete: ${formData?.name}`}
        />
      )}
    </form>
  );
}

export default MarathonForm;
