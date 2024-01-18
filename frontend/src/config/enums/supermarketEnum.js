import { translate } from '../../traducciones/i18n';

const supermarketEnum = [
  { label: translate('mercado'), value: 'MERCADO' },
  { label: translate('despensa'), value: 'DESPENSA' },
  { label: translate('refrigerados'), value: 'REFRIGERADOS' },
  { label: translate('congelados'), value: 'CONGELADOS' },
  { label: translate('especies'), value: 'ESPECIES' },
  { label: translate('dulcesYDesayuno'), value: 'DULCES' },
  { label: translate('Preparpreparadosados'), value: 'PREPARADOS' },
  { label: translate('bebidas'), value: 'DRINKS' },
];

// Carne
// Pescado
// Verdura/fruta
// Especias
// Lacteos
// Legumbres
// Despensa

// Frescos:
// Carnicería
// Charcutería
// Pescadería
// Frutas y verduras

export const getSupermarketLabel = value => {
  const element = supermarketEnum.find(each => each.value === value);

  return element ? element?.label : value;
};

export default supermarketEnum;
