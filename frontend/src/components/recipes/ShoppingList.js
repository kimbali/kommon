import React, { useEffect, useState } from 'react';
import Text from '../text/Text';
import Space from '../space/Space';
import { getSupermarketLabel } from '../../config/enums/supermarketEnum';
import { getMeasureDiminutive } from '../../config/enums/measuresEnum';

function ShoppingList({ shoppingListData = [] }) {
  const [supermarketIngredients, setSupermarketIngredients] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <Text isTitle>Lista de la compra</Text>

      <Space medium />

      {supermarketIngredients.map(section => (
        <div key={section.ingredientId}>
          <Text isSubtitle>{getSupermarketLabel(section.name)}</Text>

          <Space extraSmall />

          {section.ingredients.map(item => (
            <li>
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
