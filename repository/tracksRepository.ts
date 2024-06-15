import { Track, logsCollection } from "./db";
import { InsertManyResult, InsertOneResult } from "mongodb";

export const tracksRepository = {
  async createTracks(tracks: Track[]): Promise<true | undefined> {
    const result: InsertManyResult<Track> = await logsCollection.insertMany([
      ...tracks,
    ]);
    if (result.insertedCount) {
      return true;
    }
  },
};
