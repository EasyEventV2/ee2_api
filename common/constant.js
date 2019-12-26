/**
 * This contant indicates which document's field is returned
 */
const SelectField = {
  YES: 1,
  NO: 0,
};

const ProjectedField = {
  EVENTS_LIST: '_id name start_time end_time',
  CATEGORY_DETAIL: '_id key value',
};

const ItemsPerPage = {
  USER_EVENTS_LIST: 10,
  GUESTS_LIST: 10,
  ALL_EVENTS_LIST: 20,
};

const GuestAction = {
  VERIFY: 'verify',
  APPROVE: 'approve',
  CHECK_IN: 'checkin',
};

const UserAction = {
  VERIFY: 'verify',
};

const Email = {
  NAME: 'Easy Event',
  ADDRESS: 'admin.easy-event@mail.namdaoduy.dev',
};

const EmailSubject = {
  VERIFY_USER: '[Easy-Event] Xác nhận email đăng ký tài khoản',
  VERIFY_GUEST: '[Easy-Event] Xác nhận email đăng ký tham gia sự kiện',
  TICKET_INFO: '[Easy-Event] Vé tham dự sự kiện bởi Easy Event',
};

const GuestType = {
  PENDING: 'pending',
  APPROVED: 'approved',
  CHECKED: 'checked',
};

export default {
  SelectField,
  ProjectedField,
  ItemsPerPage,
  GuestAction,
  UserAction,
  Email,
  EmailSubject,
  GuestType,
};
