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

function validateEmailIsrequire ({ id, data }) {
  const email = lodash.get(data, 'email');
  if (lodash.isNil(email)) return;
  const query = {
    $and: [
      {
        deleted: false,
        email
      }
    ]
  };

  if (!lodash.isNil(id)) {
    query.$and.push({
      _id: {
        $ne: id
      }
    });
  }

  return AccountModel
    .findOne(query)
    .then(account => {
      if (!lodash.isNil(account)) {
        return Promise.reject(
          new Error('Email này đã tồn tại')
        );
      }
    });
}

export async function createAccount (data) {
  // validate data
  await validateEmailIsrequire({ data });

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
