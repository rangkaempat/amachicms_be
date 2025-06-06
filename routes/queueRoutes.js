const express = require("express");
const {
  getUnseatedQueueEntries,
  getQueueEntriesByDate,
  addQueueEntry,
  updateQueueEntrySeatedStatus,
  getQueueEntriesByDateUnseated,
} = require("../controllers/queueController");
const authenticateUser = require("../middleware/auth");

const router = express.Router();

// Retrieve all queue entries where isSeated = false
router.get("/unseated", getUnseatedQueueEntries);

// Retrieve all unseated queue entries for the current date
router.get("/unseatedToday", getQueueEntriesByDateUnseated);

// Retrieve all queue entries for the current date
router.get("/today", getQueueEntriesByDate);

// Add a new queue entry
router.post("/", addQueueEntry);

// Update isSeated = true for a specific queue entry by ID
router.patch("/:id/seated", authenticateUser, updateQueueEntrySeatedStatus);

module.exports = router;
