const jwt = require("jsonwebtoken");
const verify = (req, res, next) => {
  let { headers } = req;
  let token = headers.authorization.split(" ")[1];
  let verify = jwt.verify(token, "ehehe");
  if (!verify)
    return res.status(400).json({
      message: "Unauthorized",
    });
  return next();
};

module.exports = verify;
