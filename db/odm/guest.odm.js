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
 * @param {String} id
 */
async function findById(id) {
  const guest = Guest.findOne(
    { _id: id },
  );
  return guest;
}

/**
 *
 * @param {String} email
 */
async function findVerifiedEmail(email) {
  const verifiedGuest = await Guest.findOne().and([
    { email },
    { 'status.email_verified': true },
  ]);
  return verifiedGuest;
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

export default {
  findByEventId,
  countByEventId,
  save,
  findById,
  findVerifiedEmail,
  update,
};
