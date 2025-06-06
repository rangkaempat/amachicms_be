const QueueEntry = require("../models/queueModel");
const { Op } = require("sequelize");

// Add: Create a new queue entry with default isSeated = false
const addQueueEntry = async (data) => {
  return await QueueEntry.create({
    name: data.name,
    phoneNumber: data.phoneNumber,
    paxSize: data.paxSize,
    isSeated: false, // Default value
    dateTimeCreated: new Date(), // Current timestamp
    seatedTime: null,
  });
};

// Retrieve all entries where isSeated = false
const getUnseatedQueueEntries = async () => {
  return await QueueEntry.findAll({
    where: { isSeated: false },
    order: [["dateTimeCreated", "ASC"]],
  });
};

// Retrieve all queue entries where dateTimeCreated is today
const getQueueEntriesByDate = async () => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  return await QueueEntry.findAll({
    where: {
      dateTimeCreated: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
    order: [["dateTimeCreated", "ASC"]],
  });
};

const getQueueEntriesByDateUnseated = async () => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  return await QueueEntry.findAll({
    where: {
      dateTimeCreated: {
        [Op.between]: [startOfDay, endOfDay],
      },
      isSeated: false,
    },
    order: [["dateTimeCreated", "ASC"]],
  });
};

// Update isSeated = true for a specific queue entry by ID
const updateQueueEntrySeatedStatus = async (id) => {
  const entry = await QueueEntry.findByPk(id);
  if (!entry) return null;

  await entry.update({
    isSeated: true,
    seatedTime: new Date(), // Set seatedTime to current timestamp
  });
  return entry;
};

module.exports = {
  addQueueEntry,
  getUnseatedQueueEntries,
  getQueueEntriesByDate,
  updateQueueEntrySeatedStatus,
  getQueueEntriesByDateUnseated,
};
