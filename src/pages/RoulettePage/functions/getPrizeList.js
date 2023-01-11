


const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}}`;

  const reproductionArray = (array = [], length = 0) => [
    ...Array(length)
      .fill("_")
      .map(() => array[Math.floor(Math.random() * array.length)]),
  ];
  

const getReproducedPrizeList = (items) => {
  return [
    ...items,
    ...reproductionArray(items, items.length * 3),
    ...items,
    ...reproductionArray(items, items.length),
  ];
};

const getPrizeList = (items) => {
  const prizeList = getReproducedPrizeList(items);

  return [
    ...prizeList.map((prize) => ({
      ...prize,
      id: generateId(),
    })),
  ];
};

export default getPrizeList;