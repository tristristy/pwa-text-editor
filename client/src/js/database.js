import { openDB } from 'idb';
import "regenerator-runtime/runtime";

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //create object store
  const jateDb = await openDB("jate", 1);
  //start transaction
  const trans = jateDb.transaction("jate", "readwrite")
  //write to database
  const request = store.put({id:1, value:content});
  const result = await request;
  return result.value;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //object store
  const jateDb = await openDB("jate", 1);
  //create transaction to read only
  const tx = jateDb.transaction("jate", "readonly");
  //define store as jate transaction
  const store = tx.objectStore("jate");
  //
  const request = store.get(1);
  //wait for request to define as result
  const result = await request;
  //return result text to screen
  return result.value;
};

initdb();
