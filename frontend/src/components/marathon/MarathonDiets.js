import React, { useEffect, useState } from 'react';
import Text from '../text/Text';
import Space from '../space/Space';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Modal from '../modal/Modal';
import Input from '../input/Input';
import { useGetRecipesQuery } from '../../slices/recipesApiSlice';
import Button from '../button/Button';
import mealsEnum from '../../config/enums/mealsEnum';
import { useUpdateDayMutation } from '../../slices/daysApiSlice';
import toast from 'react-hot-toast';
import RecipeCard from '../recipes/RecipeCard';

function MarathonDiet({ marathon, currentDiet, mealsData, dayId, onSave }) {
  const [formData, setFormData] = useState(mealsData);
  const [showDietModal, setShowDietModal] = useState(false);
  const [recipesOptions, setRecipesOptions] = useState([]);

  useEffect(() => {
    if (mealsData) {
      const sameDietMeals = mealsData.filter(ele => ele.diet === currentDiet);
      setFormData(sameDietMeals);
    }
  }, [mealsData, currentDiet]);

  const { data: recipesData } = useGetRecipesQuery({});
  const [updateDay] = useUpdateDayMutation();

  useEffect(() => {
    if (recipesData?.recipes) {
      const options = recipesData.recipes.map(ele => {
        return { label: ele.title, value: ele._id };
      });

      setRecipesOptions(options);
    }
  }, [recipesData]);

  const handleOnChange = ({ name, value }) => {
    const dietsArray = [...formData];

    const dietData = {
      meal: name,
      diet: currentDiet,
      recipe: value,
    };

    const dietIndex = dietsArray.findIndex(
      diet => diet.meal === name && diet.diet === currentDiet
    );

    if (dietIndex !== -1) {
      dietsArray[dietIndex] = dietData;
    } else {
      dietsArray.push(dietData);
    }

    setFormData(dietsArray);
  };

  const handleSelectOption = meal => {
    const mealFound = mealsData.find(
      ele => ele.diet === currentDiet && ele.meal === meal
    );

    const optionSelected = recipesOptions.find(
      ele => ele.value === mealFound?.recipe._id
    );

    return optionSelected;
  };

  const handleOnSubmit = async e => {
    e.preventDefault();

    try {
      const otherDietMeals = mealsData.filter(ele => ele.diet !== currentDiet);
      await updateDay({
        data: { meals: [...formData, ...otherDietMeals] },
        dayId,
      });
      setShowDietModal(false);
      toast.success('Recipes saved');

      onSave();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <Text
        isSectionTitle
        sectionIcon={currentDiet && faEdit}
        sectionIconClick={() => setShowDietModal(true)}
      >
        Diet
      </Text>

      <Space small />

      {!currentDiet && <Text> Select a diet</Text>}

      {currentDiet && (
        <div className='marathon-diets'>
          {mealsEnum.map((enumMeal, index) => {
            const meal = formData?.find(ele => ele.meal === enumMeal.value);
            const recipe = recipesData.recipes.find(
              ele => ele._id === meal?.recipe || ele._id === meal?.recipe?._id
            );

            return (
              <div className='single-diet' key={`recipe-marathon-diet${index}`}>
                {recipe ? (
                  <div>
                    <RecipeCard meal={enumMeal.label} recipe={recipe} />
                  </div>
                ) : (
                  <div className='no-recipe'>{enumMeal.label}</div>
                )}
              </div>
            );
          })}

          <Space extraSmall />
        </div>
      )}

      {showDietModal && (
        <Modal onClose={setShowDietModal}>
          <form onSubmit={handleOnSubmit}>
            <Text isTitle>Update diet</Text>

            <Space medium />

            <Input
              keyValue={mealsEnum[0].value}
              label={mealsEnum[0].label}
              placeholder='Select recipe'
              options={recipesOptions}
              onChange={handleOnChange}
              selectedOption={handleSelectOption(mealsEnum[0].value)}
              name={mealsEnum[0].value}
              isSingleSelect
            />

            <Space medium />

            <Input
              keyValue={mealsEnum[1].value}
              label={mealsEnum[1].label}
              placeholder='Select recipe'
              options={recipesOptions}
              onChange={handleOnChange}
              selectedOption={handleSelectOption(mealsEnum[1].value)}
              name={mealsEnum[1].value}
              isSingleSelect
            />

            <Space medium />

            <Input
              keyValue={mealsEnum[2].value}
              label={mealsEnum[2].label}
              placeholder='Select recipe'
              options={recipesOptions}
              onChange={handleOnChange}
              selectedOption={handleSelectOption(mealsEnum[2].value)}
              name={mealsEnum[2].value}
              isSingleSelect
            />

            <Space medium />

            <Input
              keyValue={mealsEnum[3].value}
              label={mealsEnum[3].label}
              placeholder='Select recipe'
              options={recipesOptions}
              onChange={handleOnChange}
              selectedOption={handleSelectOption(mealsEnum[3].value)}
              name={mealsEnum[3].value}
              isSingleSelect
            />

            <Space medium />

            <Input
              keyValue={mealsEnum[4].value}
              label={mealsEnum[4].label}
              placeholder='Select recipe'
              options={recipesOptions}
              onChange={handleOnChange}
              selectedOption={handleSelectOption(mealsEnum[4].value)}
              name={mealsEnum[4].value}
              isSingleSelect
            />

            <Space big />

            <div className='content-on-the-right'>
              <Button isPrimary type='submit'>
                Save diets
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default MarathonDiet;
