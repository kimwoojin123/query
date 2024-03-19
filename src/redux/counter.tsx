import React, { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './reducer/countslice.reducer';
import { RootState } from './store';

export default function Counter(): ReactNode {
	const count = useSelector((state: RootState) => state.counter.value);
	const dispatch = useDispatch();

	return (
		<div>
			<div>
				<button aria-label="Increment value" onClick={() => dispatch(increment())}>
					Increment
				</button>
				<span>{count}</span>
				<button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
					Decrement
				</button>
			</div>
		</div>
	);
}
