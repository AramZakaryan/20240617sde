import { Track, tracksCollection } from "./db";
import { InsertManyResult, InsertOneResult } from "mongodb";

export const repository = {
  async createTracks(tracks: Track[]): Promise<true | undefined> {
    const result: InsertManyResult<Track> =
      await tracksCollection.insertMany(tracks);
    if (result.insertedCount) {
      return true;
    }
  },
};
