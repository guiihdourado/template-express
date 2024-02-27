/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import 'dotenv/config'

import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'

import '@shared/container'

import { AppError } from '@shared/application/errors/app-error'

import { router } from './routes'

const app = express()

app.use(express.json())

app.use(cors())
app.use(router)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  })
})

export { app }
