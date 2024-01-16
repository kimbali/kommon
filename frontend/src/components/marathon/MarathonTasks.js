import { faDumbbell, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import Space from '../space/Space';
import Text from '../text/Text';
import Modal from '../modal/Modal';
import { useUpdateDayMutation } from '../../slices/daysApiSlice';
import toast from 'react-hot-toast';
import Input from '../input/Input';
import { useGetTasksQuery } from '../../slices/tasksApiSlice';
import Button from '../button/Button';
import { useTranslation } from 'react-i18next';

function MarathonTasks({ tasksData, dayId, onSave }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [options, setOptions] = useState([]);

  const { data: tasksList } = useGetTasksQuery({});
  const [updateDay] = useUpdateDayMutation();

  useEffect(() => {
    if (tasksData) {
      const tasksIds = tasksData.map(ele => ele._id);
      setFormData([...tasksIds, '']);
    }
  }, [tasksData]);

  useEffect(() => {
    if (tasksList?.tasks) {
      const options = tasksList.tasks.map(ele => {
        return { label: ele.title, value: ele._id };
      });

      setOptions(options);
    }
  }, [tasksList]);

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
        data: { tasks: [...modifiedArr] },
        dayId,
      });
      setShowEditModal(false);
      toast.success('Tasks updated');

      onSave();
    } catch (err) {
      console.error(err.message);
      toast.error('Error updating tasks');
    }
  };

  return (
    <div>
      <Text
        isSectionTitle
        sectionIcon={faEdit}
        sectionIconClick={() => setShowEditModal(true)}
      >
        To do list
      </Text>

      <Space small />

      <div className='marathon-tasks'>
        {tasksData?.length > 0 &&
          tasksData.map((ele, index) => (
            <Text className='single-task' key={`config-tasks-${index}`}>
              {ele.title}
            </Text>
          ))}
      </div>

      {showEditModal && (
        <Modal scroll onClose={setShowEditModal} isSecondary>
          <form onSubmit={handleOnSubmit}>
            <Text isTitle>Update tasks</Text>

            <Space medium />

            {formData?.length > 0 &&
              formData.map((ele, index) => (
                <div
                  className={`input-with-trash ${ele ? '' : 'no-data'}`}
                  key={`input-task${index}`}
                >
                  <Input
                    label={`Task ${index + 1}`}
                    placeholder='Select task'
                    options={options}
                    onChange={value => handleOnChange(value, index)}
                    selectedOption={ele && handleSelectOption(ele)}
                    name='task'
                    isSingleSelect
                  />

                  {ele && (
                    <Button
                      onlyIcon
                      iconLeft={faTrash}
                      onClick={() => handleDeleteWorkout(index)}
                    />
                  )}

                  <Space extraSmall />
                </div>
              ))}

            <Space medium />

            <div className='content-on-the-right'>
              <Button type='submit' isPrimary iconLeft={faDumbbell}>
                Save tasks
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default MarathonTasks;
