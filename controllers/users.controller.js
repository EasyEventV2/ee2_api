import asyncDec from 'utils/asyncDecoration';
import userCore from 'core/users.core';

const getUserById = asyncDec(async (req, res) => {
  const dataResponse = await userCore.findUserById(req.params.userId);
  res.json({
    data: dataResponse,
  });
});

export default {
  getUserById,
};
