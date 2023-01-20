const bcrypt = require("bcrypt");

function hash(pass) {
  return bcrypt.hash(pass, 10);
}

async function verifyHash(pass, hashPass) {
  let checker = await bcrypt.compare(pass, hashPass);
  if (!checker) return false;
  return true;
}

module.exports = { hash, verifyHash };
