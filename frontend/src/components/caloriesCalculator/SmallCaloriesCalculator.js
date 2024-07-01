import React, { useState } from 'react';
import Text from '../../components/text/Text';
import Space from '../../components/space/Space';
import Input from '../../components/input/Input';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/userContext';
import activitiesEnum, {
  getActivityNumeral,
} from '../../config/enums/activitiesEnum';
import porpusesEnum, {
  getPorpuseNumeral,
} from '../../config/enums/porpusesEnum';
import Button from '../../components/button/Button';
import {
  breastfeedNumeral,
  caloriesCalculatorFormula,
} from '../../utils/calculateEnergy';

function SmallCaloriesCalculator({ isAdmin = false, adminUser }) {
  const { t } = useTranslation();
  const { user } = useUser();
  const [formData, setFormData] = useState(
    isAdmin ? { ...adminUser } : { ...user }
  );
  const [totalCalories, setTotalCalories] = useState(0);

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCalculate = e => {
    e.preventDefault();

    const total = caloriesCalculatorFormula({ ...formData });
    setTotalCalories(total);
  };

  return (
    <div className='small-calories-calculator'>
      <form onSubmit={handleCalculate} className='background-2 no-margin'>
        <Text isSubtitle>{t('caloriesCalculator')}</Text>

        <Space small />

        <div className='side'>
          <div className='sizes'>
            <Input
              label={t('age')}
              placeholder=''
              type='number'
              onChange={handleOnChange}
              name='age'
              value={formData.age}
            />

            <Input
              label={t('weightKg')}
              placeholder=''
              type='number'
              onChange={handleOnChange}
              name='weight'
              value={formData.weight}
            />

            <Input
              label={t('height')}
              placeholder=''
              type='number'
              onChange={handleOnChange}
              name='height'
              value={formData.height}
            />
          </div>

          <Input
            label={t('goal')}
            placeholder=''
            type='radio'
            onChange={handleOnChange}
            name='porpuse'
            selectedOption={formData.porpuse}
            options={porpusesEnum}
          />

          <Input
            label={t('activity')}
            placeholder=''
            type='radio'
            onChange={handleOnChange}
            name='activity'
            selectedOption={formData.activity}
            options={activitiesEnum}
            hideSubLabel={true}
          />
        </div>

        <Button isPrimary type='submit' center>
          {t('calculate')}
        </Button>

        <Space small />

        <Text center isBold fontSize='18'>
          {totalCalories} kcal
        </Text>

        <Space extraSmall />

        <Text center>
          {`
            655 
             + ( 9.6 * ${formData?.weight} )      
             + ( 1.8 * ${formData?.height} )
             - ( 4.7 * ${formData?.age} ))
             * ( ${getActivityNumeral(formData?.activity)} )
             * ( ${getPorpuseNumeral(formData?.porpuse)} )
             + ( ${breastfeedNumeral(formData?.breastfeed)} )
            = `}
          {totalCalories} kcal
        </Text>
      </form>
    </div>
  );
}

export default SmallCaloriesCalculator;
