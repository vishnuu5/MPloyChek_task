import Record from "../models/Record.js"

export const createRecord = async (req, res, next) => {
  try {
    const { title, description, status } = req.body

    const record = await Record.create({
      title,
      description,
      status,
      user: req.user._id,
    })

    res.status(201).json(record)
  } catch (error) {
    next(error)
  }
}

export const getUserRecords = async (req, res, next) => {
  try {
    // Check if delay parameter is provided
    const delay = Number.parseInt(req.query.delay) || 0

    // Simulate delay if requested
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay))
    }

    // If user is admin, they can see all records
    const filter = req.user.role === "Admin" ? {} : { user: req.user._id }

    const records = await Record.find(filter).sort({ createdAt: -1 })
    res.json(records)
  } catch (error) {
    next(error)
  }
}

export const getRecordById = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id)

    if (!record) {
      res.status(404)
      throw new Error("Record not found")
    }

    // Check if user has permission to access this record
    if (record.user.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
      res.status(403)
      throw new Error("Not authorized to access this record")
    }

    res.json(record)
  } catch (error) {
    next(error)
  }
}

export const updateRecord = async (req, res, next) => {
  try {
    const { title, description, status } = req.body

    const record = await Record.findById(req.params.id)

    if (!record) {
      res.status(404)
      throw new Error("Record not found")
    }

    // Check if user has permission to update this record
    if (record.user.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
      res.status(403)
      throw new Error("Not authorized to update this record")
    }

    // Update record
    record.title = title || record.title
    record.description = description || record.description
    record.status = status || record.status

    const updatedRecord = await record.save()
    res.json(updatedRecord)
  } catch (error) {
    next(error)
  }
}

export const deleteRecord = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id)

    if (!record) {
      res.status(404)
      throw new Error("Record not found")
    }

    // Check if user has permission to delete this record
    if (record.user.toString() !== req.user._id.toString() && req.user.role !== "Admin") {
      res.status(403)
      throw new Error("Not authorized to delete this record")
    }

    await record.deleteOne()
    res.json({ message: "Record removed" })
  } catch (error) {
    next(error)
  }
}

