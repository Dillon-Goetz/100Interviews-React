
import { Client, Databases, ID, Query, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

const databases = new Databases(client);
const storage = new Storage(client);

export { client, databases, ID, Query, storage }; // Export the client and databases


