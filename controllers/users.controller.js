import asyncDec from 'utils/asyncDecoration';
import userCore from 'core/users.core';
import constant from 'common/constant';

const { UserAction } = constant;

const getUserById = asyncDec(async (req, res) => {
  const dataResponse = await userCore.findUserById(req.uid);
  res.json({
    data: dataResponse,
  });
});

const createNewUser = asyncDec(async (req, res) => {
  const dataResponse = await userCore.saveNewUser(req.body);
  res.json({
    data: dataResponse,
  });
});

const updateUser = asyncDec(async (req, res) => {
  const { action } = req.body;
  const { userId } = req.params;
  let dataResponse = {};
  if (action === UserAction.VERIFY) {
    dataResponse = await userCore.updateVerifyEmail(userId);
  }
  res.json({
    data: dataResponse,
  });
});

export default {
  getUserById,
  createNewUser,
  updateUser,
};
