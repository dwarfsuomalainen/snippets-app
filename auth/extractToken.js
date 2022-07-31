const jwt = require("jsonwebtoken");

module.exports = function (req) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  let token;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  } else {
    token = null;
  }
  if (token == null) throw new Error("Invalid token");
  console.log("Token ok");
  const decoded = jwt.decode(token, { SECRET: process.env.SECRET });
  console.log("decoded", decoded);
  return decoded;
};
