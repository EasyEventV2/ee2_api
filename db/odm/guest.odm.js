import Guest from 'db/models/Guest';

/**
 *
 * @param {String} eventId
 * @param {Number} offset
 * @param {Number} limit
 */
async function findByEventId(eventId, offset, limit) {
  const listGuests = await Guest.find(
    { event: eventId },
  ).skip(offset).limit(limit);
  return listGuests;
}

/**
 *
 * @param {String} eventId
 */
async function countByEventId(eventId) {
  const totalGuests = await Guest.count(
    { event: eventId },
  ).where('ticket').ne(null);
  return totalGuests;
}


async function findPendingByEventId(eventId, offset, limit) {
  const listGuests = await Guest.find({
    event: eventId,
    'status.email_verified': true,
    'status.ticket_approved': false,
    'ticket.checkin_at': null,
  }).skip(offset).limit(limit);
  return listGuests;
}

/**
 *
 * @param {String} eventId
 */
async function countPendingByEventId(eventId) {
  const totalGuests = await Guest.count({
    event: eventId,
    'status.email_verified': true,
    'status.ticket_approved': false,
    'ticket.checkin_at': null,
  });
  return totalGuests;
}

async function findAprrovedByEventId(eventId, offset, limit) {
  const listGuests = await Guest.find({
    event: eventId,
    'status.email_verified': true,
    'status.ticket_approved': true,
    'ticket.checkin_at': null,
  }).skip(offset).limit(limit);
  return listGuests;
}

async function countApprovedByEventId(eventId) {
  const totalGuests = await Guest.count({
    event: eventId,
    'status.email_verified': true,
    'status.ticket_approved': true,
    'ticket.checkin_at': null,
  });
  return totalGuests;
}

async function findCheckedInByEventId(eventId, offset, limit) {
  const listGuests = await Guest.find(
    { event: eventId },
  )
    .where('ticket.checkin_at')
    .ne(null)
    .skip(offset)
    .limit(limit);
  return listGuests;
}

async function countCheckedInByEventId(eventId) {
  const totalGuests = await Guest.count(
    { event: eventId },
  ).where('ticket.checkin_at').ne(null);
  return totalGuests;
}

/**
 *
 * @param {String} id
 */
async function findById(id) {
  const guest = await Guest.findOne(
    { _id: id },
  );
  return guest;
}

/**
 *
 * @param {String} eventId
 * @param {String} email
 */
async function findByEventIdAndEmail(eventId, email) {
  const guest = await Guest.findOne().and([
    { event: eventId },
    { email },
  ]);
  return guest;
}

/**
 *
 * @param {String} code
 */
async function findByTicketStatus(code) {
  const guest = await Guest.findOne().and([
    { 'ticket.code': code },
    { 'ticket.checkin_at': { $eq: null } },
  ]);
  return guest;
}

/**
 *
 * @param {Object} guest
 */
async function save(guest) {
  const newGuest = new Guest(guest);
  await newGuest.save();
  return newGuest;
}

/**
 *
 * @param {String} guestId
 * @param {Object} updates
 */
async function update(guestId, updates) {
  const updateQueryObject = await Guest.findOneAndUpdate(
    { _id: guestId },
    updates,
    { new: true },
  );
  return updateQueryObject;
}

async function findByCode(code) {
  const guest = await Guest.findOne(
    { 'ticket.code': code },
  );
  return guest;
}

export default {
  findByEventId,
  countByEventId,
  findPendingByEventId,
  countPendingByEventId,
  findAprrovedByEventId,
  countApprovedByEventId,
  findCheckedInByEventId,
  countCheckedInByEventId,
  findById,
  findByCode,
  findByEventIdAndEmail,
  findByTicketStatus,
  save,
  update,
};
