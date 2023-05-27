import AccountModel from '../../models/account.model';
import moment from 'moment-timezone';
import lodash from 'lodash';
import bcrypt from 'bcrypt';

const now = moment.tz('Asia/Saigon');

async function encodePassword (password) {
  if (!lodash.isNil(password)) {
    password = await bcrypt.hash(password, 10);
  }
  return password;
};

export async function createAccount (data) {

  let account = new AccountModel();
  account.firstName = data.firstName;
  account.lastName = data.lastName;
  account.email = data.email;
  account.password = await encodePassword(data.password);
  account.activated = true;
  account.deleted = false;
  account.createdAt = now;
  account.updatedAt = now;

  account.save();
};
