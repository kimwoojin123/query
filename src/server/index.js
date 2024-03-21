import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const uri = 'mongodb+srv://kimwoojin:dnwls12@kimcluster.vi2fpad.mongodb.net/?retryWrites=true&w=majority'

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

		// MongoDB에 연결 후 count 값을 저장
		const db = client.db('test'); // 데이터베이스 선택
		const collection = db.collection('count'); // 컬렉션 선택
		await collection.insertOne({ count }); // count 값을 컬렉션에 저장

		res.status(200).json({ message: 'Count saved successfully' });
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
