const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_URL;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});
async function connectDB() {
	try {
		await client.connect();
		console.log('Connected to MongoDB!');
		return client;
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		throw error;
	}
}

async function closeConnection() {
	try {
		await client.close();
		console.log('Closed MongoDB connection.');
	} catch (error) {
		console.error('Error closing MongoDB connection:', error);
	}
}

module.exports = {
	connectDB,
	closeConnection,
	client,
};
