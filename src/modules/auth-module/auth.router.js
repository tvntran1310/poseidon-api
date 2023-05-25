import express from 'express';

import * as authController from './controllers/auth.controller';
import RouterWrapper from '../../utils/router.util';

const routerWrapper = new RouterWrapper();

routerWrapper.post('/register', authController.registerAccount);

export default routerWrapper.router;
