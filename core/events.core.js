/* eslint-disable camelcase */
import eventODM from 'db/odm/event.odm';
import roleODM from 'db/odm/role.odm';
import groupODM from 'db/odm/group.odm';
import categoryODM from 'db/odm/category.odm';
import pagination from 'utils/pagination';
import constant from 'common/constant';
import { EventNotFoundError } from 'common/error';
import { Types } from 'mongoose';


const { ItemsPerPage } = constant;

/**
 *
 * Return list of events that associate with an user (pagination)
 * @param {String} userId
 * @param {Number} page
 * @returns {Object} pagination info with list of Events
 */
async function findEventsByUser(userId, page) {
  const totalEvents = await eventODM.countByUserId(userId);
  const paginatedObject = pagination
    .getPaginatedObject(totalEvents, ItemsPerPage.USER_EVENTS_LIST, page);
  const { offset, limit, ...paginationInfo } = paginatedObject;
  const listEvents = await eventODM.findByUserId(userId, offset, limit);
  return {
    ...paginationInfo,
    itemsList: listEvents,
  };
}

/**
 *
 * @param {String} eventId
 */
async function findEventDetails(eventId) {
  const event = await eventODM.findById(eventId);
  if (!event) {
    throw new EventNotFoundError();
  }
  return event;
}

/**
 *
 * @param {Number} page
 */
async function findAllEvents(page) {
  const totalEvents = await eventODM.countAll();
  const paginatedObject = pagination
    .getPaginatedObject(totalEvents, ItemsPerPage.ALL_EVENTS_LIST, page);
  const { offset, limit, ...paginationInfo } = paginatedObject;
  const listEvents = await eventODM.findAll(offset, limit);
  return {
    ...paginationInfo,
    listItems: listEvents,
  };
}

async function findAllCategories() {
  const listCategories = await categoryODM.findAll();
  return listCategories;
}

async function saveNewEvent(userId, event) {
  const savedEvent = await eventODM.save(event);

  const roleAdmin = await roleODM.findByNameAndType('admin', 'default');
  const roleStaff = await roleODM.findByNameAndType('staff', 'default');

  await groupODM.save({
    event: Types.ObjectId(savedEvent.id),
    user: [userId],
    name: 'admin',
    role: Types.ObjectId(roleAdmin.id),
  });

  await groupODM.save({
    event: Types.ObjectId(savedEvent.id),
    user: [],
    name: 'staff',
    role: Types.ObjectId(roleStaff.id),
  });

  return {
    savedEvent,
  };
}

export default {
  findEventsByUser,
  findEventDetails,
  findAllEvents,
  findAllCategories,
  saveNewEvent,
};
