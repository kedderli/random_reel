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

const dataKey = 'data';

export const createShareLink = () : string  => {
  const options = getFromLocalStorage()

  const urlParams = new URLSearchParams();
  urlParams.append(dataKey, JSON.stringify(options))

  const { protocol, hostname, port, pathname } = window.location;
  const modigiedPort = port ? `:${port}` : ''
  const url =`${protocol}//${hostname}${modigiedPort}${pathname}?${urlParams.toString()}`;

  return url;
}

export const parseShareLink = ():void => {
  const params = new URLSearchParams(window.location.search)
  const data = params.get(dataKey);

  if (data) {
    try {
      const parsedData = JSON.parse(data);

      if (isOptions(parsedData)) {
        saveToLocalStorage(parsedData);

        const url = new URL(window.location.href);
        const {searchParams} = url;
        searchParams.delete(dataKey);
        window.location.replace(url.toString());
      }
    } catch (e) {
      console.log(e);
    }
  }
}