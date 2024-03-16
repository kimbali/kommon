import React, { useState } from 'react';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import Input from '../components/input/Input';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/userContext';
import activitiesEnum, {
  getActivityNumeral,
} from '../config/enums/activitiesEnum';
import porpusesEnum, { getPorpuseNumeral } from '../config/enums/porpusesEnum';
import Button from '../components/button/Button';
import {
  breastfeedNumeral,
  caloriesCalculatorFormula,
} from '../utils/calculateEnergy';

function CaloriesCalculator({ isAdmin = false, adminUser }) {
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
    <div className='calories-calculator'>
      <Text isTitle>{t('caloriesCalculator')}</Text>

      <Text>{t('calculateCaloriesForYouProgram')}</Text>

      <Space medium />

      <form onSubmit={handleCalculate} className='background-2 no-margin'>
        <Text isSubtitle>{t('generalInfo')}</Text>
        <Text>{t('tellUsMoreAboutYou')}</Text>

        <Space small />

        <Input
          label={t('age')}
          placeholder=''
          type='number'
          onChange={handleOnChange}
          name='age'
          value={formData.age}
        />

        <Space small />

        <Input
          label={t('weightKg')}
          placeholder=''
          type='number'
          onChange={handleOnChange}
          name='weight'
          value={formData.weight}
        />

        <Space small />

        <Input
          label={t('height')}
          placeholder=''
          type='number'
          onChange={handleOnChange}
          name='height'
          value={formData.height}
        />

        <Space medium />

        <Input
          label={t('goal')}
          subLabel={t('specifyGoal')}
          placeholder=''
          type='radio'
          onChange={handleOnChange}
          name='porpuse'
          selectedOption={formData.porpuse}
          options={porpusesEnum}
        />

        <Space medium />

        <Input
          label={t('activity')}
          subLabel={t('specifyActivity')}
          placeholder=''
          type='radio'
          onChange={handleOnChange}
          name='activity'
          selectedOption={formData.activity}
          options={activitiesEnum}
        />

        <Space big />

        <Button big isPrimary type='submit' center>
          {t('calculate')}
        </Button>

        <Space medium />

        <Text center>{t('dailyCalorieIntake')}</Text>

        <Space extraSmall />

        <Text center isBold fontSize='32'>
          {totalCalories} kcal
        </Text>

        <Space medium />

        {isAdmin && (
          <>
            <Text>{`
            Fórmula = 655 
            + ( 9.6 * peso )      
            + ( 1.8 * altura )
            - ( 4.7 * edad )
            * ( actividad )
            * ( meta )
            - ( dar el pecho )
            `}</Text>

            <Space medium />

            <Text>{`
            655 
             + ( 9.6 * ${formData?.weight} )      
             + ( 1.8 * ${formData?.height} )
             - ( 4.7 * ${formData?.age} )
             * ( ${getActivityNumeral(formData?.activity)} )
             * ( ${getPorpuseNumeral(formData?.porpuse)} )
             - ( ${breastfeedNumeral(formData?.breastfeed)} )
            `}</Text>

            <Space medium />

            <Text>
              Total fórmula ={' '}
              {Math.round(
                (655 +
                  9.6 * +formData?.weight +
                  1.8 * +formData?.height -
                  4.7 * +formData?.age) *
                  getActivityNumeral(formData?.activity) *
                  getPorpuseNumeral(formData?.porpuse) -
                  breastfeedNumeral(formData?.breastfeed)
              )}
            </Text>

            <Space extraSmall />

            <Text>
              Total redondeado a múltiplos de 50 ={' '}
              {caloriesCalculatorFormula(formData)}
            </Text>
          </>
        )}
      </form>
    </div>
  );
}

export default CaloriesCalculator;
