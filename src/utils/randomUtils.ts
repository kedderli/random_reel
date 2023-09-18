import { Option } from '../types/types';

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomOptionid = (optionList: Option[]): number => {
  const activeOptionList = optionList.filter((option) => !option.disabled);

  if (activeOptionList.length === 0) {
    return 0;
  }

  let startPosition = 0;

  const coefficientSumm = activeOptionList.reduce((accum, option) => accum + option.randomnessСoefficient, 0);
  const randomValue = getRandomInt(1, coefficientSumm);

  for (let i = 0; i < activeOptionList.length; i++) {
    if (randomValue > startPosition && randomValue <= activeOptionList[i].randomnessСoefficient + startPosition) {
      return activeOptionList[i].id;
    } else {
      startPosition = startPosition + activeOptionList[i].randomnessСoefficient;
    }
  }

  return 0;
};
