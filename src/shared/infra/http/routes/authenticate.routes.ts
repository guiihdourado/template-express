import { Router } from 'express'

import { celebrate, Segments, Joi } from 'celebrate'

import { AuthenticateUserController } from '@modules/users/infra/http/controllers/authenticate-user.controller.ts'

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

authenticateRoutes.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authenticateUserController.handle,
)

export { authenticateRoutes }
