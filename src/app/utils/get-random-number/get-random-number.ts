export const getRandomNumber = (rangeTo: number): (() => number | null) => {
  const excludes: number[] = [];

  return function randomize() {
    const index = Math.floor(Math.random() * rangeTo);

    if (excludes.length === rangeTo) {
      return null;
    }
    if (excludes.includes(index)) {
      return randomize();
    }

    excludes.push(index);

    return index;
  };
};
