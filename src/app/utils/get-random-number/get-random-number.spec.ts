import { getRandomNumber } from '@utils/get-random-number/get-random-number';

const MAX_RANGE = 5;

const setupRandomizeFunction = (): () => number | null => {
  return getRandomNumber(MAX_RANGE);

}

describe('Utils: getRandomNumber', () => {

  it('should return a function', () => {
    const randomize = setupRandomizeFunction();

    expect(typeof randomize).toBe('function');
  });

  it('should return a number', () => {
    const randomize = setupRandomizeFunction();
    const value: number | null = randomize();

    expect(typeof value).toBe('number');
  });

  it('should return a number in range ', () => {
    const randomize = setupRandomizeFunction();

    const value: number | null = randomize();
    expect(value).toBeLessThanOrEqual(MAX_RANGE);
    expect(value).toBeGreaterThanOrEqual(0);
  });

  it('should return null when we have got all numbers in range', () => {
    const randomize = setupRandomizeFunction();

    for (let i = 0; i < 5; i++) {
      randomize();
    }

    const value: number | null = randomize();
    expect(value).toBeNull();
  })
});