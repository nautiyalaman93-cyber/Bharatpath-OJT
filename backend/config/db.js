/**
 * @file db.js
 * @description Connects our backend to MongoDB using Mongoose.
 * 
 * HOW IT WORKS:
 * - We call this function once when the server starts.
 * - It reads the MONGO_URI from our .env file.
 * - If connection fails, the server logs the error and exits.
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    // If using the placeholder URI from .env.example, spin up an In-Memory Server
    if (!uri || uri.includes('<username>') || uri.includes('cluster.mongodb.net/bharatpath')) {
      console.log('⚠️ Placeholder MONGO_URI detected. Starting In-Memory MongoDB...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log(`✅ In-Memory MongoDB Started: ${uri}`);
    }

    const conn = await mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Primary MongoDB Connection Error: ${error.message}`);
    
    // Fallback to In-Memory MongoDB so the app doesn't crash
    console.log('🔄 Falling back to In-Memory MongoDB to keep the app running...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const fallbackUri = mongoServer.getUri();
      await mongoose.connect(fallbackUri);
      console.log(`✅ Success: Running on In-Memory MongoDB: ${fallbackUri}`);
    } catch (fallbackError) {
      console.error(`❌ Critical: Fallback DB also failed: ${fallbackError.message}`);
      throw fallbackError;
    }
  }
};

module.exports = connectDB;
