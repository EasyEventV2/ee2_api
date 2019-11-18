/* eslint-disable no-unused-vars */
import { CastError } from 'mongoose';
import Event from '../db/models/Event';
import Group from '../db/models/Group';

/**
 *
 * @name findEventsByUser
 * @description return list of events that associate with an user
 * @param {String} userId
 * @returns {Object} list of Events
 */
async function findEventsByUser(userId) {
  const result = {};
  let status = 500;
  let body = {};
  try {
    const eventArray = await Group
      .find({
        users: userId,
      }, { _id: 0 })
      .populate('event')
      .select('event');

    status = 200;
    body = {
      data: eventArray,
    };
  } catch (err) {
    if (err instanceof CastError) {
      status = 400;
      body = {
        error: {
          code: 40001,
          message: 'Bad Request: Unable to cast ObjectId',
          data: {},
        },
      };
    } else {
      body = {
        error: {
          code: 500,
          message: 'Internal Server Error',
          data: {},
        },
      };
    }
  }
  result.status = status;
  result.body = body;
  return result;
}


export default { findEventsByUser };
