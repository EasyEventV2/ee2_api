/**
 * This contant indicates which document's field is returned
 */
const SelectField = {
  YES: 1,
  NO: 0,
};

const ProjectedField = {
  EVENTS_LIST: '_id name start_time end_time',
  CATEGORY_DETAIL: '_id value',
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

export default {
  SelectField,
  ProjectedField,
  ItemsPerPage,
  GuestAction,
};
