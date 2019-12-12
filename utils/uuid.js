import uuid from 'uuidv4';

/**
 *
 * @param {String} str
 */
const generateFromString = (str) => uuid.fromString(str);

export default {
  generateFromString,
};
