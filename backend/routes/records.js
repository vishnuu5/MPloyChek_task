import express from "express"
import {
  createRecord,
  getUserRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
} from "../controllers/recordController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").post(protect, createRecord).get(protect, getUserRecords)

router.route("/:id").get(protect, getRecordById).put(protect, updateRecord).delete(protect, deleteRecord)

export default router

