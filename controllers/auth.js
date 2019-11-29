import authCore from 'core/auth';

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const dataResponse = await authCore.checkLogin(username, password);
    res.json({
      data: dataResponse,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  login,
};
