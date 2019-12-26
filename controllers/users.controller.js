import asyncDec from 'utils/asyncDecoration';
import userCore from 'core/users.core';

const getUserById = asyncDec(async (req, res) => {
  const userId = (req.params.userId === 'me') ? req.uid : req.params.userId;
  const dataResponse = await userCore.findUserById(userId);
  res.json({
    data: dataResponse,
  });
});

const createNewUser = asyncDec(async (req, res) => {
  const dataResponse = await userCore.saveNewUser(req.body.userInfo);
  res.json({
    data: dataResponse,
  });
});

export default {
  getUserById,
  createNewUser,
};
