import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGO_URI || "mongodb://0.0.0.0:27017";
const client = new MongoClient(mongoUri);

const db = client.db("userAnalytics");

export const logsCollection = db.collection<Track>("tracks");

export async function runDb() {
  try {
    await client.connect();
    await client.db("userAnalytics").command({ ping: 1 });
    console.log("Successful connection to MongoDB userAnalytics");
  } catch {
    console.log("Cannot connect to MongoDB userAnalytics");
    await client.close();
  }
}

// Types
export type Track = {
  event: string;
  tags: string[];
  url: string;
  title: string;
  ts: number;
};
