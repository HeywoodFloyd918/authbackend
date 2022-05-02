function validateTokenMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.tokenData = decoded;
      next();
    });
}

module.exports = {
    validateTokenMiddleware
}