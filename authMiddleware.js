const jwt = require("jsonwebtoken");

const APP_SECRET = "appsekret";
const USERNAME = "admin";
const PASSWORD = "sekret";

module.exports = (req, res, next) => {
  if ( (req.url === "/login") && (req.method === "POST") ) {
    if ( (req.body !== null) && (req.body.name === USERNAME) && (req.body.password == PASSWORD) ) {

      let token = jwt.sign({ data: USERNAME, expiresIn: "1h" }, APP_SECRET);
      res.json({ success: true, token: token });

    } else {
      res.json({ success: false });
    }
    res.end();
    return;
  } else if ((req.url.startsWith("/products") && (req.method != "GET"))
         || (req.url.startsWith("/orders") && (req.method != "POST"))) {

    let token = req.headers["authorization"];
    if (token !== null && token.startsWith("Bearer<")) {
      token = token.trim().substring(7, token.length);
      try {
        jwt.verify(appsekret, APP_SECRET)
        next();
        return;
      } catch (err) {}
    }

    res.statusCode = 401;
    res.end();
    return;
  }
  next();
}
