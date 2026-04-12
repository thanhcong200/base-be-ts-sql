/**
 * tokentype
 */
export enum OTP_TYPE {
  REGISTER = 'register',
  RECOVER_PASSWORD = 'recoverpassword',
  CHANGE_PASSWORD = 'changepassword',
  DELETE_ACCOUNT = 'deleteaccount',
  RESET_PASSWORD = 'resetpassword',
}

export const OPT_CONFIGURATION: any = {
  [OTP_TYPE.REGISTER]: {
    time: 3,
    unit: 'minutes',
    limit: 0,
  },
  [OTP_TYPE.RECOVER_PASSWORD]: {
    time: 30,
    unit: 'minutes',
    limit: 5,
  },
  [OTP_TYPE.CHANGE_PASSWORD]: {
    time: 3,
    unit: 'minutes',
    limit: 0,
  },
  [OTP_TYPE.DELETE_ACCOUNT]: {
    time: 3,
    unit: 'minutes',
    limit: 0,
  },
  [OTP_TYPE.RESET_PASSWORD]: {
    time: 3,
    unit: 'minutes',
    limit: 0,
  },
};

export const OTP_LIMIT_SEND = 5;
