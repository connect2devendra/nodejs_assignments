const jwt = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let headerAuth = req.get("authorization");
    // console.log(headerAuth);
    if (headerAuth) {
      // Remove "Bearer " from string
      token = headerAuth.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, (err, auth) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Invalid Token..."
          });
        } else {
          req.auth = auth;
          next();
        }
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Bearer token header field should not be empty!"
      });
    }
  }
};
