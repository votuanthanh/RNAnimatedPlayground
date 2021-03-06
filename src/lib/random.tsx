const getRandomInt = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const shuffleArray = (arr: any[]) => {
  return arr
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
};

export {getRandomInt, shuffleArray};
