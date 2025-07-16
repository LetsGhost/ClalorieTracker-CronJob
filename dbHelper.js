import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

export async function connectToDatabase() {
    if (db) {
        return db;
    }

    try {
        await client.connect();
        db = client.db(process.env.DB_NAME); // Replace with your database name
        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

export async function closeConnection() {
    try {
        await client.close();
        console.log('MongoDB connection closed');
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
    }
}

