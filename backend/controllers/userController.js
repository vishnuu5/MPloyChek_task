import User from "../models/User.js"

export const getUsers = async (req, res, next) => {
  try {
    // Check if delay parameter is provided
    const delay = Number.parseInt(req.query.delay) || 0

    // Simulate delay if requested
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay))
    }

    const users = await User.find({}).select("-password")
    res.json(users)
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password")

    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error("User not found")
    }
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if (user) {
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      user.fullName = req.body.fullName || user.fullName
      user.role = req.body.role || user.role

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        role: updatedUser.role,
      })
    } else {
      res.status(404)
      throw new Error("User not found")
    }
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if (user) {
      await user.deleteOne()
      res.json({ message: "User removed" })
    } else {
      res.status(404)
      throw new Error("User not found")
    }
  } catch (error) {
    next(error)
  }
}

