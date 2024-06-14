import {Log, logsCollection} from "./db";
import {InsertOneResult} from "mongodb";

export const logsRepository = {

    async createLog(log: Log): Promise<true | undefined> {
        const result: InsertOneResult<Log> = await logsCollection
            .insertOne(log)
        if (result.insertedId) {
            return true
        }
    }
}
