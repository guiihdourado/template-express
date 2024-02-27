import { container } from 'tsyringe'

import { IStorageProvider } from './storage.provider'
import { LocalStorageProvider } from './implementations/local-storage.provider'

const diskStorage = {
  local: LocalStorageProvider,
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.disk],
)
