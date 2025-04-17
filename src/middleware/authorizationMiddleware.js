module.exports = function authorizationMiddleware(roles) {
    return (req, res, next) => {
      try {
        const role = req.user.role;
  
        if (!roles.includes(role)) {
          return res.status(403).json({ message: "Unauthorized access: insufficient permissions" });
        }
  
        next(); // User is authorized
      } catch (error) {
        res.status(500).json({ message: "Internal server error during authorization", error: error.message });
      }
    };
  };