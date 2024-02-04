import React, { useEffect, useState } from 'react';
import Text from '../text/Text';
import Space from '../space/Space';
import { getSupermarketLabel } from '../../config/enums/supermarketEnum';
import { getMeasureDiminutive } from '../../config/enums/measuresEnum';
import { useTranslation } from 'react-i18next';
import { useMarathon } from '../../context/marathonContext';
import { useGetShoppingListQuery } from '../../slices/marathonApiSlice';
import { useDate } from '../../context/dateContext';

function ShoppingList() {
  const { t } = useTranslation();
  const { marathonId } = useMarathon();
  const { currentDay } = useDate();

  const [supermarketIngredients, setSupermarketIngredients] = useState([]);

  const { data: shoppingListData } = useGetShoppingListQuery(
    { marathonId, week: currentDay?.week },
    {
      skip: !marathonId || !currentDay,
    }
  );

  useEffect(() => {
    if (!shoppingListData) {
      return;
    }

    const supermarketSections = shoppingListData.reduce((acc, ele) => {
      const newSet = [...acc];
      const position = acc.findIndex(item => item.name === ele.supermarket);

      if (acc.length === 0 || position === -1) {
        return [...acc, { name: ele.supermarket, ingredients: [ele] }];
      }

      newSet[position] = {
        name: ele.supermarket,
        ingredients: [...newSet[position].ingredients, ele],
      };

      return newSet;
    }, []);

    setSupermarketIngredients(supermarketSections);
  }, [shoppingListData]);

  return (
    <div>
      <Text isTitle>{t('shoppingList')}</Text>
      <Text>{t('shoppingListHelp')}</Text>

      <Space medium />

      {supermarketIngredients.map(section => (
        <div key={section.name}>
          <Text isSubtitle color='primary'>
            {getSupermarketLabel(section.name)}
          </Text>

          <Space extraSmall />

          {section.ingredients.map((item, i) => (
            <li key={`${i}${section.ingredientId}`}>
              <Text>
                {item.name} - {item.quantity}{' '}
                {getMeasureDiminutive(item.measure)}
              </Text>
            </li>
          ))}

          <Space small />
        </div>
      ))}
    </div>
  );
}

export default ShoppingList;
