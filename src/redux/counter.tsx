import React, { useState, useEffect, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './reducer/countslice.reducer';
import { RootState } from './store';
import { motion } from 'framer-motion';
import { Button, Tooltip } from '@nextui-org/react';
import { axiosInstance } from '../axiosSetting';

export default function Counter(): ReactNode {
	const [updateCount, setUpdateCount] = useState(0);
	const count = useSelector((state: RootState) => state.counter?.value);
	const dispatch = useDispatch();

	useEffect(() => {
		const sendCount = async () => {
			try {
				const response = await axiosInstance('POST', 'http://localhost:5000/api/count', { count });
				console.log(response);
				const updatedCount = response.data.updatedCount;
				setUpdateCount(updatedCount);
			} catch (err) {
				console.log(err);
			}
		};
		sendCount();
	}, [count]);

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 2 }}
			style={{
				width: '100vw',
				height: '100vh',
				backgroundColor: 'blue',
				position: 'fixed',
				top: 0,
				left: 0,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				color: 'white',
			}}
		>
			<div>
				<Button variant="solid" color="primary" size="lg" onClick={() => dispatch(increment())}>
					Increment
				</Button>
				<span>{count}</span>
				<Button color="primary" onClick={() => dispatch(decrement())}>
					Decrement
				</Button>
			</div>
			<span>{updateCount}</span>
		</motion.div>
	);
}
