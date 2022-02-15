import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

// Ahead of time compiles requires an exported function for factories
export function migrationFactory() {
  // The animal table was added with version 2 but none of the existing tables or data needed
  // to be modified so a migrator for that version is not included.
  return {
    1: (db: any, transaction:any) => {
      const store = transaction.objectStore('people');
      store.createIndex('country', 'country', { unique: false });
    },
    3: (db:any, transaction:any) => {
      const store = transaction.objectStore('people');
      store.createIndex('age', 'age', { unique: false });
    }
  };
}
