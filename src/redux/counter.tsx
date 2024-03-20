import React, { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './reducer/countslice.reducer';
import { RootState } from './store';
import { motion } from 'framer-motion';

export default function Counter(): ReactNode {
	const count = useSelector((state: RootState) => state.counter?.value);
	const dispatch = useDispatch();

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
				<button aria-label="Increment value" onClick={() => dispatch(increment())}>
					Increment
				</button>
				<span>{count}</span>
				<button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
					Decrement
				</button>
			</div>
		</motion.div>
	);
}
