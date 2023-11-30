const calculateEnergy = (type = '', ingredients = []) => {
  const total = ingredients.reduce((acc, ele) => {
    if (!ele?.ingredient) {
      return acc;
    }

    return acc + ele.ingredient[type] * (ele.quantity || 0);
  }, 0);

  return total.toLocaleString('de-DE');
};

export default calculateEnergy;
