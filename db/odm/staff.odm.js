/* eslint-disable no-unused-vars */
import constant from 'common/constant';
import Group from 'db/models/Group';
import User from 'db/models/User';

const { ProjectedField } = constant;

async function findByEventId(eventId) {
  const listStaffs = await Group.find(
    { event: eventId },
  )
    .populate('users', ProjectedField.STAFFS_LIST).where('name', 'staff');
  return listStaffs;
}

async function findByEventAndId(eventId, staffId) {
  const staff = await Group.findOne(
    { event: eventId, name: 'staff', users: staffId },
  );
  return staff;
}

async function saveToEvent(eventId, staffId) {
  const updatedGroup = await Group.findOneAndUpdate(
    { event: eventId, name: 'staff' },
    { $push: { users: staffId } },
    { new: true },
  );
  return updatedGroup;
}

async function removeFromEvent(eventId, staffId) {
  const updatedGroup = await Group.findOneAndUpdate(
    { event: eventId, name: 'staff' },
    { $pull: { users: staffId } },
    { new: true },
  );
  return updatedGroup;
}

export default {
  findByEventAndId,
  findByEventId,
  saveToEvent,
  removeFromEvent,
};
