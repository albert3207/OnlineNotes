const rolecheck = (ROLES) => {
  return (req, res, next) => {
    if (ROLES == "ADMIN") {
      next();
    }
    return res.send("not authorized");
  };
};

module.exports = { rolecheck };
