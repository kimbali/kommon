import React from 'react';
import Text from '../text/Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import FOTO_NEUTRA from '../../styles/assets/foto-comida-neutra.jpg';

function RecipeCard({ recipe, onClick }) {
  return (
    <button onClick={onClick}>
      <div className='recipe-card'>
        <div className='recipe-card-details'>
          <div>
            <img src={FOTO_NEUTRA} alt={recipe.title} />
            <Text isTitle>{recipe.title}</Text>
          </div>

          <div className='recipe-card-data'>
            <div>
              <FontAwesomeIcon icon={faClock} />
              {recipe.minutes}
            </div>
            <div>{recipe.calories} kcal</div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default RecipeCard;
