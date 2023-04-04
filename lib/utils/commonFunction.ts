const date = new Date();

const getYear = () => {
  return date.getFullYear();
};

const splitUnderScore = (str: string) => {
  return `${str.split('_').join(' ').slice(0, 1).toUpperCase()}${str
    .slice(1)
    .split('_')
    .join(' ')}`;
};

export { getYear, splitUnderScore };
