export const isString = value => {
  if (!value) return null;

  if (typeof value === 'string') return true;
};

export const isNumber = value => {
  if (!value) return null;

  if (typeof value === 'number') return true;
};
