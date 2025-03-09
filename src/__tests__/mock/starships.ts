import { StarshipShortProperties } from '../../types/types';

export function createMockData(number: number) {
  const arr = [];
  for (let i = 0; i <= number; i++) {
    const number = i === 0 ? '' : ` ${i}`;
    const starship: StarshipShortProperties = {
      name: `nameStar${number}`,
      model: `modelStar${number}`,
      manufacturer: `manufactureStar${number}`,
      length: `lengthStar${number}`,
      consumables: `consumablesStar${number}`,
    };
    if (i === 0) {
      arr.push(starship);
    } else {
      arr.push(starship);
    }
  }
  return arr;
}
export const starshipsMock = {
  name: 'test',
  model: 'test',
  length: 'test',
  consumables: 'test',
  manufacturer: 'test',
};
