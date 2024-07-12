const CustomErr = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomErr.UnauthenticatedError("Authentication invalid");
  }

  try {
    const { name, userId, email, role } = isTokenValid({ token });
    req.user = { name, userId, email, role };
    return next();
  } catch (error) {
    throw new CustomErr.UnauthenticatedError("Authentication invalid");
  }
};

module.exports = { authenticateUser };
