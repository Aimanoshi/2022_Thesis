// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageConnection, IFileStorage, MakeDirectoryOptions, UserIdentity, Stat } from './interface';

class AzureStorage implements IFileStorage {
  constructor(conn: StorageConnection, user?: UserIdentity) {
    // connect to Mongo
    // TODO: make the connect string and options pull from the connection
    conn;

    console.log(conn);
    console.log('user');
  }
  stat(path: string): Promise<Stat> {
    throw new Error('Method not implemented.');
  }
  readFile(path: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  readDir(path: string): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
  exists(path: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  writeFile(path: string, content: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
  removeFile(path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  mkDir(path: string, options?: MakeDirectoryOptions): Promise<void> {
    throw new Error('Method not implemented.');
  }
  rmDir(path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  glob(pattern: string, path: string): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
  copyFile(src: string, dest: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  rename(oldPath: string, newPath: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default async (composer: any): Promise<void> => {
  await composer.useStorage(AzureStorage);
};
