import { NextFunction, Request, Response } from 'express'

import auth from '@config/auth'

import { AppError } from '@shared/application/errors/app-error'
import { JsonWebTokenProvider } from '@shared/container/providers'

interface IPayload {
  sub: string
  email: string
}

export async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const jsonWebTokenProvider = new JsonWebTokenProvider()
    const { sub: userId, email } = jsonWebTokenProvider.verifyToken(
      token,
      auth.secretToken,
    ) as IPayload

    request.user = {
      id: userId,
      email,
    }

    next()
  } catch {
    throw new AppError('Invalid token!', 401)
  }
}
