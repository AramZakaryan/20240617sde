import { MongoClient } from "mongodb";

const mongoUri: string = "mongodb://0.0.0.0:27017";
const client = new MongoClient(mongoUri);

const db = client.db("tracker");

export const tracksCollection = db.collection<Track>("tracks");

export async function runDb() {
  try {
    await client.connect();
    await client.db("tracker").command({ ping: 1 });
    console.log("connected to MongoDB tracker");
  } catch {
    console.log("cannot connect to MongoDB tracker");
    await client.close();
  }
}

export type Track = {
  event: string;
  tags: string[];
  url: string;
  title: string;
  ts: number;
};
