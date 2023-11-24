import { faDumbbell, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import Space from '../space/Space';
import Text from '../text/Text';
import Modal from '../modal/Modal';
import { useUpdateDayMutation } from '../../slices/daysApiSlice';
import toast from 'react-hot-toast';
import Input from '../input/Input';
import Button from '../button/Button';
import MeditationCard from '../meditation/MeditationCard';
import { useGetMeditationsQuery } from '../../slices/meditationsApiSlice';

function MarathonMeditations({ meditationData, dayId, onSave }) {
  const [formData, setFormData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState([]);

  const { data: meditationsList } = useGetMeditationsQuery({});
  const [updateDay] = useUpdateDayMutation();

  useEffect(() => {
    if (meditationData) {
      const meditationsId = meditationData.map(ele => ele._id);
      setFormData([...meditationsId, '']);
    }
  }, [meditationData]);

  useEffect(() => {
    if (meditationsList?.meditations) {
      const options = meditationsList.meditations.map(ele => {
        return { label: ele.title, value: ele._id };
      });

      setOptions(options);
    }
  }, [meditationsList]);

  const handleOnChange = ({ name, value }, index) => {
    const modifiedArray = [...formData];
    modifiedArray[index] = value;

    if (index === formData.length - 1) {
      modifiedArray.push('');
    }
    setFormData(modifiedArray);
  };

  const handleDelete = index => {
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
        data: { meditations: [...modifiedArr] },
        dayId,
      });
      setShowModal(false);
      toast.success('Meditations updated');

      onSave();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <Text
        isSectionTitle
        sectionIcon={faEdit}
        sectionIconClick={() => setShowModal(true)}
      >
        Meditations
      </Text>

      <Space small />

      <div className='marathon-config-scrollx no-fix-content'>
        {meditationData?.length > 0 &&
          meditationData.map((ele, index) => (
            <div className='single-workout' key={`config-meditations-${index}`}>
              <MeditationCard data={ele} />
            </div>
          ))}
      </div>

      {showModal && (
        <Modal scroll onClose={setShowModal} isSecondary>
          <form onSubmit={handleOnSubmit}>
            <Text isTitle>Update meditations</Text>

            <Space medium />

            {formData?.length > 0 &&
              formData.map((ele, index) => (
                <div
                  className={`input-with-trash ${ele ? '' : 'no-data'}`}
                  key={`input-meditation${index}`}
                >
                  <Input
                    key={`marathon-meditation-${index}`}
                    label={`Meditation ${index + 1}`}
                    placeholder='Select meditation'
                    options={options}
                    onChange={value => handleOnChange(value, index)}
                    selectedOption={ele && handleSelectOption(ele)}
                    name='meditation'
                    isSingleSelect
                  />

                  {ele && (
                    <Button
                      onlyIcon
                      iconLeft={faTrash}
                      onClick={() => handleDelete(index)}
                    />
                  )}

                  <Space small />
                </div>
              ))}

            <Space medium />

            <div className='content-on-the-right'>
              <Button type='submit' isPrimary iconLeft={faDumbbell}>
                Save meditations
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default MarathonMeditations;
