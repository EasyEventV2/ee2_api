import userCore from '../core/users';

const getUserById = async (req, res) => {
  const dataResponse = await userCore.findById(req.params.userId);
  res.status(dataResponse.status).json(dataResponse.body);
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const dataResponse = await userCore.checkLogin(username, password);
  res.status(dataResponse.status).json(dataResponse.body);
};

export default {
  getUserById,
  login,
};
