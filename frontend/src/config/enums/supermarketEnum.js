const supermarketEnum = [
  { label: 'Mercado', value: 'MERCADO' },
  { label: 'Despensa', value: 'DESPENSA' },
  { label: 'Refrigerados', value: 'REFRIGERADOS' },
  { label: 'Congelados', value: 'CONGELADOS' },
  { label: 'Especies', value: 'ESPECIES' },
  { label: 'Dulces y desayuno', value: 'DULCES' },
  { label: 'Preparados', value: 'PREPARADOS' },
  { label: 'Bebidas', value: 'DRINKS' },
];

// Carne
// Pescado
// Verdura/fruta
// Especias
// Lacteos
// Legumbres
// Despensa

export const getDietEnumLabel = value => {
  const element = supermarketEnum.find(each => each.value === value);

  return element ? { label: element?.label, svg: element.svg } : value;
};

export default supermarketEnum;
