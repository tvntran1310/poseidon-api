import express from 'express';

import * as authController from './controllers/auth.controller';

const router = express.Router();

router.post('/register', handleRequestWrapper(authController.registerAccount));

function handleRequestWrapper(handleRequestFunc) {
  return async (req, res) => {
    const returnData = await handleRequestFunc({
      data: req.body
    });
    res.send(returnData);
  }
}

export default router;
