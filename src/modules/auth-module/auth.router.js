import * as authController from './auth.controller';
import RouterWrapper from '../../utils/router.util';

const routerWrapper = new RouterWrapper();

routerWrapper.post('/register', authController.registerAccount);
routerWrapper.post('/login', authController.loginAccount)

export default routerWrapper.router;
