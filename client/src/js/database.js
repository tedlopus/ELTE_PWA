import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to the database");
  // create the connection -- version 1
  const jateDb = await openDB("jate", 1);
  // creates the transaction as readwrite
  const tx = jateDb.transaction("jate", "readwrite");
  // use object store to store the db
  const store = tx.objectStore("jate");
  // put new additions into the db
  const request = store.put({ jate: content });

  // confirmation of request
  const result = await request;
  console.log("🚀 - data saved to the database", result);
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET all from the database");
  // create the connection -- version 1
  const jateDb = await openDB("jate", 1);
  // creates the transaction as readonly
  const tx = jateDb.transaction("jate", "readonly");
  // use object store to store the db
  const store = tx.objectStore("jate");
  // get all from store
  const request = store.getAll();

  // confirmation of request  
  const result = await request;
  console.log("result.value", result);
};

initdb();
