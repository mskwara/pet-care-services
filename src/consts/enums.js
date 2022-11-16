const ITEM_TYPE = {
  SERVICE: 'SERVICE',
  REQUEST: 'REQUEST',
};

const OFFER_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
};

const WEEKDAY = {
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday',
  SUNDAY: 'sunday',
};

const PERIOD = {
  WEEK: 'WEEK',
  MONTH: 'MONTH',
};

const ENV = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
};

const S3_DIRECTORY = {
  AVATARS: 'avatars',
  ADVERTISEMENTS: 'advertisements',
};

export { ITEM_TYPE, WEEKDAY, OFFER_STATUS, PERIOD, ENV, S3_DIRECTORY };
