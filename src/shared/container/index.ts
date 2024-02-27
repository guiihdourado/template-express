import { container } from 'tsyringe'

import '@shared/container/providers/hash'
import '@shared/container/providers/json-token'
import '@shared/container/providers/storage'

import { IUsersRepository } from '@modules/users/application/repositories'
import { UsersRepository } from '@modules/users/infra/database/prisma/repositories'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
