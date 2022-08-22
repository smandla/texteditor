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

export const putDb = async (content) => {
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");
  // Open up the desired object store.
  const store = tx.objectStore("jate");
  const request = store.put({ data: content });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

export const getDb = async () => {
  const jateDb = await openDB("jate", 1);

  const tx = jateDb.transaction("jate", "readonly");

  const store = tx.objectStore("jate");

  const request = store.get(1);

  const result = await request;
  console.log("🚀 - data saved to the database", result);
};
initdb();
