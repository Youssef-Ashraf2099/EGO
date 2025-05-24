module.exports = function authorizationMiddleware(roles) {
    return (req, res, next) => {
      try {
        const role = req.user.role;
        console.log(`Checking authorization for user with role: ${role}`);
        if (!roles.includes(role)) {
          return res.status(403).json({ message: "Unauthorized access: insufficient permissions" });
        }
        console.log(`User with role ${role} is authorized for this route.`);
        next(); // User is authorized
      } catch (error) {
        res.status(500).json({ message: "Internal server error during authorization", error: error.message });
      }
    };
  };