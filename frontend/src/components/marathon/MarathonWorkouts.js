import { faDumbbell, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import Space from '../space/Space';
import Text from '../text/Text';
import Modal from '../modal/Modal';
import { useUpdateDayMutation } from '../../slices/daysApiSlice';
import toast from 'react-hot-toast';
import Input from '../input/Input';
import { useGetWorkoutsQuery } from '../../slices/workoutsApiSlice';
import Button from '../button/Button';
import WorkoutCard from '../workouts/WorkoutCard';
import frontRoutes from '../../config/frontRoutes';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function MarathonWorkouts({ workoutsData, dayId, onSave }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [options, setOptions] = useState([]);

  const { data: workoutsList } = useGetWorkoutsQuery({});
  const [updateDay] = useUpdateDayMutation();

  useEffect(() => {
    if (workoutsData) {
      const workoutsIds = workoutsData.map(ele => ele._id);
      setFormData([...workoutsIds, '']);
    }
  }, [workoutsData]);

  useEffect(() => {
    if (workoutsList?.workouts) {
      const options = workoutsList.workouts.map(ele => {
        return { label: ele.title, value: ele._id };
      });

      setOptions(options);
    }
  }, [workoutsList]);

  const handleOnChange = ({ name, value }, index) => {
    const modifiedArray = [...formData];
    modifiedArray[index] = value;

    if (index === formData.length - 1) {
      modifiedArray.push('');
    }
    setFormData(modifiedArray);
  };

  const handleDeleteWorkout = index => {
    const modifiedArray = [...formData];
    modifiedArray.splice(index, 1);

    setFormData(modifiedArray);
  };

  const handleSelectOption = selectedItem => {
    const optionSelected = options.find(ele => ele.value === selectedItem);

    return optionSelected;
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    try {
      const modifiedArr = [...formData];
      modifiedArr.pop();

      await updateDay({
        data: { workouts: [...modifiedArr] },
        dayId,
      });
      setShowWorkoutModal(false);
      toast.success(t('updated'));

      onSave();
    } catch (err) {
      console.error(err.message);
    }
  };

  const navigateToWorkoutDetail = id => {
    navigate(frontRoutes.workoutDetails.replace(':id', id));
  };

  return (
    <div>
      <Text
        isSectionTitle
        sectionIcon={faEdit}
        sectionIconClick={() => setShowWorkoutModal(true)}
      >
        {t('workouts')}
      </Text>

      <Space small />

      <div className='marathon-config-scrollx no-fix-content'>
        {workoutsData?.length > 0 &&
          workoutsData.map((ele, index) => (
            <div className='single-workout' key={`config-workouts-${index}`}>
              <WorkoutCard
                data={ele}
                onClick={() => navigateToWorkoutDetail(ele._id)}
              />
            </div>
          ))}
      </div>

      {showWorkoutModal && (
        <Modal scroll onClose={setShowWorkoutModal} isSecondary>
          <form onSubmit={handleOnSubmit}>
            <Text isTitle>
              {t('update')} {t('workout')}
            </Text>

            <Space medium />

            {formData?.length > 0 &&
              formData.map((ele, index) => (
                <div
                  className={`input-with-trash ${ele ? '' : 'no-data'}`}
                  key={`input-workout${index}`}
                >
                  <Input
                    key={`marathon-workout-${index}`}
                    label={`${t('workout')} ${index + 1}`}
                    placeholder={t('selectWorkout')}
                    options={options}
                    onChange={value => handleOnChange(value, index)}
                    selectedOption={ele && handleSelectOption(ele)}
                    name={'workout'}
                    isSingleSelect
                  />

                  {ele && (
                    <Button
                      onlyIcon
                      iconLeft={faTrash}
                      onClick={() => handleDeleteWorkout(index)}
                    />
                  )}

                  <Space small />
                </div>
              ))}

            <Space medium />

            <div className='content-on-the-right'>
              <Button type='submit' isPrimary iconLeft={faDumbbell}>
                {t('save')}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default MarathonWorkouts;
