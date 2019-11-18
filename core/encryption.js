import bcrypt from 'bcrypt';

const saltRounds = 12;

function encrypt(plainText) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(plainText, salt);
  return hash;
}

export default { encrypt };
