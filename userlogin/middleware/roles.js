const rolecheck = (ROLES) => {
  return (req, res, next) => {
    if (ROLES == "ADMIN") {
      console.log("authorized");
      next();
    }
    res.send("not authorized");
    // next();
  };
};

module.exports = { rolecheck };
