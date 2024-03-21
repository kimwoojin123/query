import express from 'express';
// import { connectDB, closeConnection, client } from 'utils/db';

export const app = express();

app.use(express.json());

app.get('/api/test', (_, res) => res.json({ greeting: 'Hellow' }));

app.post('/api/count', (req, res) => {
	const { count } = req.body;
  console.log(count)
});
