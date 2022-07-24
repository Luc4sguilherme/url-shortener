import { celebrate, Joi, Segments } from 'celebrate';
import express from 'express';

import * as urlController from '@src/controllers/urlController';
import { authMiddleware } from '@src/middlewares/auth';

const router = express.Router();

router.get('/', authMiddleware, urlController.list);
router.get('/:shortUrlID', urlController.access);
router.delete('/:shortUrlID', authMiddleware, urlController.remove);

router.post(
  '/shorten',
  authMiddleware,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      fullUrl: Joi.string().required(),
    }),
  }),
  urlController.shorten,
);

export { router };
