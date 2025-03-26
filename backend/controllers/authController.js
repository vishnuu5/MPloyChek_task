import jwt from "jsonwebtoken"
import User from "../models/User.js"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "your_jwt_secret", {
    expiresIn: "30d",
  })
}

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, fullName } = req.body

    const userExists = await User.findOne({ $or: [{ email }, { username }] })
    if (userExists) {
      res.status(400)
      throw new Error("User already exists")
    }

    const user = await User.create({
      username,
      email,
      password,
      fullName,
      role: "General User",
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error("Invalid user data")
    }
  } catch (error) {
    next(error)
  }
}


export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error("Invalid username or password")
    }
  } catch (error) {
    next(error)
  }
}


export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password")

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        createdAt: user.createdAt,
      })
    } else {
      res.status(404)
      throw new Error("User not found")
    }
  } catch (error) {
    next(error)
  }
}


export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      user.fullName = req.body.fullName || user.fullName
      user.email = req.body.email || user.email

      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        role: updatedUser.role,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404)
      throw new Error("User not found")
    }
  } catch (error) {
    next(error)
  }
}

