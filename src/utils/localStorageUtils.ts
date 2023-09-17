import { Option } from '../types/types';

const key = 'options';

const isOptions = (value: unknown): value is Option[] => {
  if (
    Array.isArray(value) &&
    value.every((item) => {
      if (
        item &&
        typeof item === 'object' &&
        'id' in item &&
        typeof item.id === 'number' &&
        'disabled' in item &&
        typeof item.disabled === 'boolean' &&
        'randomnessСoefficient' in item &&
        typeof item.randomnessСoefficient === 'number' &&
        'value' in item &&
        typeof item.value === 'string'
      ) {
        return true;
      }
      return false;
    })
  ) {
    return true;
  }

  return false;
};

export const saveToLocalStorage = (options: Option[]) => {
  localStorage.setItem(key, JSON.stringify(options));
};

export const getFromLocalStorage = (): Option[] => {
  try {
    const options = JSON.parse(localStorage.getItem(key) || '');

    if (isOptions(options)) {
      return options;
    }

    return [];
  } catch {
    return [];
  }
};
