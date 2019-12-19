import { fromString } from 'uuidv4';

/**
 *
 * @param {String} str
 */
const generateFromString = (str) => fromString(str);

export default {
  generateFromString,
};
