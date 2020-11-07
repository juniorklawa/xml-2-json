import { Router } from 'express';

import converterRoute from './converter.routes';

const routes = Router();

routes.use('/converter', converterRoute);

export default routes;
