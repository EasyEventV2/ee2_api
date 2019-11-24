import userCore from 'core/users';

const getUserById = async (req, res, next) => {
  try {
    const dataResponse = await userCore.findUserById(req.params.userId);
    res.json({
      data: dataResponse,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const dataResponse = await userCore.checkLogin(username, password);
    res.json({
      data: dataResponse,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  getUserById,
  login,
};
