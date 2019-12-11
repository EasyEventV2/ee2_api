/* eslint-disable no-unused-vars */
import constant from 'common/constant';
import Category from 'db/models/Category';
import Event from 'db/models/Event';
import Group from 'db/models/Group';
import { Schema } from 'mongoose';

const { SelectField, ProjectedField } = constant;

/**
 *
 * @param {String} userId
 */
async function findByUserId(userId, offset, limit) {
  const listEvents = await Group.find(
    { users: userId },
    { _id: SelectField.NO }, // This is Group'id, that will not be returned.
  ).populate('event', ProjectedField.EVENTS_LIST).skip(offset).limit(limit);
  return listEvents;
}

/**
 *
 * @param {String} userId
 */
async function countByUserId(userId) {
  const totalEvents = await Group.countDocuments({ users: userId });
  return totalEvents;
}

/**
 * Get all public events
 * @param {Number} offset
 * @param {Number} limit
 * @returns {Array<Object>} list all public events
 */
async function findAll(offset, limit) {
  const listEvents = await Event.find(
    {},
    { contact: SelectField.NO, location: SelectField.NO, description: SelectField.NO },
  ).populate('category')
    .skip(offset)
    .limit(limit);
  return listEvents;
}

/**
 * Count all public events for pagination
 * @returns {Number} total events
 */
async function countAll() {
  const totalEvents = await Event.countDocuments();
  return totalEvents;
}

/**
 * Find an event that matches given ID
 * @param {String} id
 * @returns {Object} event
 */
async function findById(id) {
  const event = await Event.findOne(
    { _id: id },
  ).populate('category', ProjectedField.CATEGORY_DETAIL);
  return event;
}

async function save(event) {
  if (!event) {
    throw Error('No Information');
  }
  const newEvent = new Event(event);
  const savedEvent = await newEvent.save();
  return savedEvent;
}

async function update(eventId, updates) {
  const updatedEvent = await Event.findOneAndUpdate(
    { _id: eventId },
    updates,
    { new: true },
  );
  return updatedEvent;
}

export default {
  findByUserId,
  countByUserId,
  findAll,
  countAll,
  findById,
  save,
  update,
};
