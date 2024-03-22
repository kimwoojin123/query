import CustomModal from '../modal';
import { RootState } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { openModal, closeModal } from './reducer/modal.reducer';

export default function CountModal(): JSX.Element {
	const dispatch = useDispatch();
	const count = useSelector((state: RootState) => state.counter?.value);
	const isCountModalOpen = useSelector((state: RootState) => state.modal['countModal']?.isOpen);

	useEffect(() => {
		if (count && count > 10) {
			dispatch(openModal({ modalId: 'countModal' }));
		} else {
			dispatch(closeModal({ modalId: 'countModal' }));
		}
	}, [count, dispatch]);

	return (
		<CustomModal
			isOpen={isCountModalOpen}
			onRequestClose={() => dispatch(closeModal({ modalId: 'countModal' }))}
			width="400px"
			height="200px"
		>
			<div>
				<h2>Title</h2>
				<p>Modal Content</p>
				<button onClick={() => dispatch(closeModal({ modalId: 'countModal' }))}>Close Modal</button>
			</div>
		</CustomModal>
	);
}
