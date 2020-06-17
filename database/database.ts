import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

import { config } from "https://deno.land/x/dotenv/mod.ts";
const env = config();

const client = new MongoClient();
client.connectWithUri(`mongodb://${env.DB_HOST}:${+env.DB_PORT}`);
const db = client.database(env.DB_DATABASE);

export default db;
