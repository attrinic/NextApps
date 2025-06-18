import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/Mongodb";

if (!global.mongoose) {
    global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
    if (global.mongoose.conn) return global.mongoose.conn;

    if (!global.mongoose.promise) {
        global.mongoose.promise = mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((mongoose) => mongoose)
    }

    global.mongoose.conn = await global.mongoose.promise;
    return global.mongoose.conn;
}
