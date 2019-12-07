import asyncDec from 'utils/asyncDecoration';
import authCore from 'core/auth.core';

const login = asyncDec(async (req, res) => {
  const { username, password } = req.body;
  const dataResponse = await authCore.checkLogin(username, password);
  res.json({
    data: dataResponse,
  });
});

export default {
  login,
};
