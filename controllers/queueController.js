const queueService = require("../services/queueService");

// Retrieve all unseated queue entries
exports.getUnseatedQueueEntries = async (req, res) => {
  try {
    const queueEntries = await queueService.getUnseatedQueueEntries();
    res.json(queueEntries);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving queue entries",
      error: error.message,
    });
  }
};

// Retrieve all queue entries for the current date
exports.getQueueEntriesByDate = async (req, res) => {
  try {
    const queueEntries = await queueService.getQueueEntriesByDate();
    res.json(queueEntries);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving queue entries by date",
      error: error.message,
    });
  }
};

// Retrieve all unseated queue entries for the current date
exports.getQueueEntriesByDateUnseated = async (req, res) => {
  try {
    const queueEntries = await queueService.getQueueEntriesByDateUnseated();
    res.json(queueEntries);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving unseated queue entries by date",
      error: error.message,
    });
  }
};

// Add a new queue entry
exports.addQueueEntry = async (req, res) => {
  try {
    const { name, phoneNumber, paxSize } = req.body;

    if (!name || !phoneNumber || !paxSize) {
      return res
        .status(400)
        .json({ message: "Name, phone number, and pax size are required." });
    }

    const newEntry = await queueService.addQueueEntry(req.body);
    res.status(201).json(newEntry);
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "Error adding queue entry", error: error.message });
  }
};

// Update isSeated = true for a specific queue entry by ID
exports.updateQueueEntrySeatedStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEntry = await queueService.updateQueueEntrySeatedStatus(id);

    if (!updatedEntry) {
      return res.status(404).json({ message: "Queue entry not found." });
    }

    res.json({ message: "Queue entry updated as seated", entry: updatedEntry });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error updating queue entry", error: error.message });
  }
};
