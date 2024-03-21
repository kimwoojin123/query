import express from 'express';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const uri = 'mongodb+srv://kimwoojin:dnwls12@kimcluster.vi2fpad.mongodb.net/?retryWrites=true&w=majority';

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

export const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get('/api/test', (_, res) => res.json({ greeting: 'Hellow' }));

app.post('/api/count', async (req, res) => {
	try {
		const { count } = req.body;
		console.log(count);

		const db = client.db('test');
		const collection = db.collection('count');

		await collection.updateOne(
			{ _id: new ObjectId('65fbc708bd2804d1f197c54a') },
			{ $inc: { count: count } }, // count 값을 더합니다.
			{ upsert: false }, // upsert 옵션을 false로 설정하여 문서가 없으면 새로 생성하지 않습니다.
		);

		const updatedDocument = await collection.findOne({ _id: new ObjectId('65fbc708bd2804d1f197c54a') });
		res.status(200).json({ message: 'Count saved successfully', updatedCount: updatedDocument.count });
	} catch (error) {
		console.error('Error saving count to MongoDB:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

const PORT = 5000; // 포트 번호를 환경 변수로부터 가져오거나 기본값으로 3000 사용
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// 서버 종료 시 MongoDB 연결 종료
process.on('SIGINT', () => {
	closeConnection().then(() => {
		console.log('MongoDB connection closed');
		process.exit(0);
	});
});
