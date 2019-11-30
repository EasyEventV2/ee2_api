import asyncDec from 'utils/asyncDecorator';
import authCore from 'core/auth';

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
