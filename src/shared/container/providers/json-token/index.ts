import { container } from 'tsyringe'

import { IJsonTokenProvider } from './json-token.provider'
import { JsonWebTokenProvider } from './implementations/jsonwebtoken.provider'

container.registerSingleton<IJsonTokenProvider>(
  'JsonTokenProvider',
  JsonWebTokenProvider,
)
