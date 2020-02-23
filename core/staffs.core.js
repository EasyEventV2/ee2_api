import staffODM from 'db/odm/staff.odm';
import eventODM from 'db/odm/event.odm';
import {
  EventNotFoundError, UserNotFoundError, StaffExistedError, StaffNotFoundError,
} from 'common/error';
import userODM from 'db/odm/user.odm';

async function findStaffsByEventId(eventId) {
  const event = await eventODM.findById(eventId);
  if (!event) {
    throw new EventNotFoundError();
  }
  const listStaffs = await staffODM.findByEventId(eventId);
  return listStaffs;
}

async function addStaffToEvent(eventId, staffEmail) {
  const staff = await userODM.findByEmail(staffEmail);
  if (!staff) {
    throw new UserNotFoundError();
  }
  const exStaff = await staffODM.findByEventAndId(eventId, staff.id);
  if (exStaff) {
    throw new StaffExistedError();
  }
  const updatedGroup = await staffODM.saveToEvent(eventId, staff.id);
  return {
    updatedGroup,
  };
}

async function removeStaffFromEvent(eventId, staffId) {
  const exStaff = await staffODM.findByEventAndId(eventId, staffId);
  if (!exStaff) {
    throw new StaffNotFoundError();
  }
  const updatedGroup = await staffODM.removeFromEvent(eventId, staffId);
  return {
    updatedGroup,
  };
}

export default {
  findStaffsByEventId,
  addStaffToEvent,
  removeStaffFromEvent,
};
