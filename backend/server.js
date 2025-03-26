import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import recordRoutes from "./routes/records.js"
import { errorHandler } from "./middleware/errorMiddleware.js"

dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/records", recordRoutes)

// Default route
app.get("/", (req, res) => {
  res.send("API is running...")
})

// Error handling middleware
app.use(errorHandler)

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/user-management"

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message)
    process.exit(1)
  })

