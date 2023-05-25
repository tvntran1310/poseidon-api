import Joi from 'joi';

export async function registerAccount({ data }) {
  const schema = Joi.object({
    firstName: Joi.string()
      .required(),
    lastName: Joi.string()
      .required(),
    email: Joi.string()
      .required(),
    password: Joi.string()
      .required(),
  });

  return schema.validateAsync(data);
}

export function loginAccount(req, res) {
  res.send({});
}
