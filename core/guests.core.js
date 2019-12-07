import constant from 'common/constant';
import guestODM from 'db/odm/guest.odm';
import { Types } from 'mongoose';
import pagination from 'utils/pagination';
import eventCore from 'core/events.core';
import {
  EventNotFoundError, GuestExistedError, GuestNotFoundError,
  EmailVerifiedError, TicketApprovedError, TicketCheckedInError, UnknownActionError,
} from 'common/error';
import uuid from 'utils/uuid';

const { ItemsPerPage } = constant;

/**
 *
 * @param {String} eventId
 * @param {Number} page
 */
async function findGuestsByEventId(eventId, page) {
  const totalGuests = await guestODM.countByEventId(eventId);
  const paginatedObject = pagination
    .getPaginatedObject(totalGuests, ItemsPerPage.GUESTS_LIST, page);
  const { offset, limit, ...paginationInfo } = paginatedObject;
  const listGuests = await guestODM.findByEventId(eventId, offset, limit);
  return {
    ...paginationInfo,
    listItems: listGuests,
  };
}

/**
 *
 * @param {String} guestId
 */
async function findGuestById(guestId) {
  const guest = await guestODM.findById(guestId);
  return guest;
}

/**
 *
 * @param {String} userId
 * @param {String} eventId
 * @param {Object} guestInfo
 */
async function saveNewGuestWithEventId(userId, eventId, guestInfo) {
  const {
    email, phoneNumber, gender, major, something,
  } = guestInfo;

  const event = await eventCore.findEventDetails(eventId);
  if (!event) {
    throw new EventNotFoundError();
  }

  const exGuest = await guestODM.findByEventIdAndEmail(eventId, email);
  if (exGuest) {
    throw new GuestExistedError({ data: exGuest });
  }

  const newGuest = {
    event: Types.ObjectId(eventId),
    email,
    user: (userId) ? Types.ObjectId(userId) : null,
    info: {
      phone_number: phoneNumber,
      gender,
      major,
      something,
    },
    status: {
      email_verified: !!(userId),
      ticket_approved: false,
    },
    ticket: {
      code: null,
      issue_at: null,
      checkin_at: null,
    },
  };

  const savedGuest = await guestODM.save(newGuest);
  return {
    savedGuest,
  };
}

/**
 *
 * @param {String} guestId
 * @param {String} action
 */
async function updateGuest(guestId, action) {
  const guest = guestODM.findById(guestId);
  if (!guest) {
    throw new GuestNotFoundError();
  }
  let updates = {};
  switch (action) {
    case 'verify':
      if (guest.status.email_verified) {
        throw new EmailVerifiedError();
      }
      updates = {
        'status.email_verified': true,
      };
      break;

    case 'approve':
      if (guest.status.ticket_approved) {
        throw new TicketApprovedError();
      }
      updates = {
        'status.ticket_approved': true,
        'ticket.code': uuid.generateFromString(guestId),
        'ticket.issue_at': Date.now(),
      };
      break;

    case 'checkin':
      if (guest.ticket.checkin_at !== null) {
        throw new TicketCheckedInError();
      }
      updates = {
        'ticket.checkin_at': Date.now(),
      };
      break;

    default: throw new UnknownActionError({ accepted: ['verify', 'approve', 'checkin'] });
  }
  const updatedGuest = await guestODM.update(guestId, updates);
  return {
    updatedGuest,
  };
}

export default {
  findGuestsByEventId,
  findGuestById,
  saveNewGuestWithEventId,
  updateGuest,
};
