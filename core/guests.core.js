/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import configs from 'configs/index';
import constant from 'common/constant';
import guestODM from 'db/odm/guest.odm';
import userODM from 'db/odm/user.odm';
import eventODM from 'db/odm/event.odm';
import { Types } from 'mongoose';
import pagination from 'utils/pagination';
import {
  EventNotFoundError, GuestExistedError, GuestNotFoundError,
  EmailVerifiedError, TicketApprovedError, TicketCheckedInError,
} from 'common/error';
import { VerifyGuestEmail, TicketEmail } from 'common/mail';
import QRCode from 'utils/QRCode';
import MailgunService from 'services/mailgun';
import { fromString } from 'uuidv4';

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

async function findPendingGuestsByEventId(eventId, page) {
  const totalGuests = await guestODM.countPendingByEventId(eventId);
  const paginatedObject = pagination
    .getPaginatedObject(totalGuests, ItemsPerPage.GUESTS_LIST, page);
  const { offset, limit, ...paginationInfo } = paginatedObject;
  const listGuests = await guestODM.findPendingByEventId(eventId, offset, limit);
  return {
    ...paginationInfo,
    listItems: listGuests,
  };
}

async function findApprovedGuestsByEventId(eventId, page) {
  const totalGuests = await guestODM.countApprovedByEventId(eventId);
  const paginatedObject = pagination
    .getPaginatedObject(totalGuests, ItemsPerPage.GUESTS_LIST, page);
  const { offset, limit, ...paginationInfo } = paginatedObject;
  const listGuests = await guestODM.findAprrovedByEventId(eventId, offset, limit);
  return {
    ...paginationInfo,
    listItems: listGuests,
  };
}

async function findCheckedInGuestsByEventId(eventId, page) {
  const totalGuests = await guestODM.countCheckedInByEventId(eventId);
  const paginatedObject = pagination
    .getPaginatedObject(totalGuests, ItemsPerPage.GUESTS_LIST, page);
  const { offset, limit, ...paginationInfo } = paginatedObject;
  const listGuests = await guestODM.findCheckedInByEventId(eventId, offset, limit);
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
    email, full_name, phone_number, gender, answers,
  } = guestInfo;

  const event = await eventODM.findById(eventId);
  if (!event) {
    throw new EventNotFoundError();
  }

  const exGuest = await guestODM.findByEventIdAndEmail(eventId, email);
  if (exGuest) {
    throw new GuestExistedError({ data: exGuest });
  }

  const user = await userODM.findById(userId);
  const emailVerified = (user && user.email_verified) ? user.email_verified : false;

  const newGuest = {
    event: Types.ObjectId(eventId),
    email,
    user: (userId) ? Types.ObjectId(userId) : null,
    info: {
      full_name,
      phone_number,
      gender,
      answers,
    },
    status: {
      email_verified: emailVerified,
      ticket_approved: false,
    },
    ticket: {
      code: null,
      issue_at: null,
      checkin_at: null,
    },
  };

  const savedGuest = await guestODM.save(newGuest);

  if (!emailVerified) {
    const verifyLink = `${configs.FE_URL}/verify?eventId=${eventId}&guestId=${savedGuest.id}`;
    const verifyEmail = new VerifyGuestEmail({
      to: `${newGuest.email}`,
      html: `Xin chào ${newGuest.email} <br/>
      Bạn đã đăng ký tham gia sự kiện ${event.name}. <br/>
      Chúng tôi cần bạn xác nhận lại email. Vui lòng ấn vào đường dẫn sau để xác nhận: <br/>
      <a href="${verifyLink}">${verifyLink}</a><br/>
      Chúng tôi sẽ gửi thông tin vé sớm nhất cho bạn`,
    });

    verifyEmail.send();
  }
  return {
    savedGuest,
  };
}

async function sendTicketMail(guest, event, ticketCode) {
  const data = {
    guestId: guest.id,
    eventId: event.id,
    ticketCode,
  };
  const dataImage = await QRCode.generateBase64Buffer(data);

  const ticketMail = new TicketEmail({
    to: `${guest.email}`,
    html: `Xin chào ${guest.email}, lại là Easy Event đây !<br/>
    Sau đây là vé dành cho sự kiện ${event.name} <br/>
    <ul>
      <li>Email: ${guest.email}</li>
      <li>Gender: ${guest.info.gender}</li>
    </ul>
    <br/>
    Bạn hãy vui lòng sử dụng mã QR Code trong file đính kèm để check in tại sự kiện nhé !`,
    attachment: new MailgunService.api.Attachment({ data: dataImage, filename: 'ticket.png' }),
  });
  ticketMail.send();
}

/**
 *
 * @param {String} guestId
 */
async function updateVerifyGuestEmail(guestId) {
  const guest = await guestODM.findById(guestId);
  if (!guest) {
    throw new GuestNotFoundError();
  }
  if (guest.get('status.email_verified')) {
    throw new EmailVerifiedError();
  }
  if (guest.user) {
    const userId = guest.user;
    await guestODM.update(userId, { email_verified: true });
  }
  const updates = {
    'status.email_verified': true,
  };
  const updatedGuest = await guestODM.update(guestId, updates);
  return {
    updatedGuest,
  };
}

/**
 *
 * @param {String} guestId
 */
async function updateApproveGuest(guestId) {
  const guest = await guestODM.findById(guestId);
  if (!guest) {
    throw new GuestNotFoundError();
  }
  const event = await eventODM.findById(guest.get('event'));
  if (guest.get('status.ticket_approved')) {
    throw new TicketApprovedError();
  }

  const ticketCode = fromString(guestId);
  const updates = {
    'status.ticket_approved': true,
    'ticket.code': ticketCode,
    'ticket.issue_at': Date.now(),
  };
  sendTicketMail(guest, event, ticketCode);

  const updatedGuest = await guestODM.update(guestId, updates);
  return {
    updatedGuest,
  };
}

/**
 *
 * @param {String} guestId
 */
async function updateCheckinGuest(ticketCode) {
  const guest = await guestODM.findByCode(ticketCode);
  if (!guest) {
    throw new GuestNotFoundError();
  }
  if (guest.get('ticket.checkin_at') !== null) {
    throw new TicketCheckedInError();
  }

  const guestId = guest.id;
  const updates = {
    'ticket.checkin_at': Date.now(),
  };

  const updatedGuest = await guestODM.update(guestId, updates);
  return {
    updatedGuest,
  };
}

/**
 *
 * @param {String} code
 */
async function findGuestByCode(code) {
  const guest = await guestODM.findByCode(code);
  return guest;
}

export default {
  findGuestsByEventId,
  findGuestById,
  findPendingGuestsByEventId,
  findApprovedGuestsByEventId,
  findCheckedInGuestsByEventId,
  saveNewGuestWithEventId,
  updateVerifyGuestEmail,
  updateApproveGuest,
  updateCheckinGuest,
  findGuestByCode,
};
