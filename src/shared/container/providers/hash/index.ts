import { container } from 'tsyringe'

import { IHashProvider } from './hash.provider'
import { BCryptHashProvider } from './implementations/bcrypt-hash.provider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
