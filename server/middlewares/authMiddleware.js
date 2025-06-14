import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
    try {
      console.log("🍪 Cookies:", req.cookies);
      console.log("🧾 Raw Cookie Header:", req.headers.cookie);
  
      const { token } = req.cookies;
      console.log("🔑 Token:", token);
  
      if (!token) {
        return next(new AppError("Unauthenticated, please login again", 401));
      }
  
      const UserDetails = await jwt.verify(token, process.env.JWT_SECRET);
  
      req.user = UserDetails;
      console.log("✅ User Verified:", req.user);
  
      next();
    } catch (error) {
      return next(new AppError("Invalid or expired token", 401));
    }
  };
  

const authorizedRoles=(...roles)=> async(req,res,next)=>{
    const currentUserRole = req.user.role;
    if(!roles.includes(currentUserRole)){
        return next(new AppError("You do not have permission to access this route" , 403))
    }

    next();
}

export {isLoggedIn, authorizedRoles};