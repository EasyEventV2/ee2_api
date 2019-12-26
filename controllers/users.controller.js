import asyncDec from 'utils/asyncDecoration';
import userCore from 'core/users.core';

const getUserById = asyncDec(async (req, res) => {
  const dataResponse = await userCore.findUserById(req.uid);
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
