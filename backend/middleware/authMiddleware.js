import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protect = async (req, res, next) => {
  let token

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret")

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password")

      next()
    } catch (error) {
      res.status(401)
      throw new Error("Not authorized, token failed")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
}

// Admin middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next()
  } else {
    res.status(403)
    throw new Error("Not authorized as an admin")
  }
}

