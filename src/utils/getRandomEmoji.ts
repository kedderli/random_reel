import { emojis } from '../constants/emojis';
import { getRandomInt } from './randomUtils';

export const getRandomEmoji = () => {
  return emojis[getRandomInt(0, emojis.length - 1)];
};
