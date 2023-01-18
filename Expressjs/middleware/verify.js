const jwt = require("jsonwebtoken");
const verify = (req, res, next) => {
  let { body } = req;
  let verify = jwt.verify(body.key, "ehehe");
  if (!verify)
    return res.status(400).json({
      message: "Unauthorized",
    });
  return next();
};

module.exports = verify;
