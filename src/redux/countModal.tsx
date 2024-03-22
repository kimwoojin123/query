import CustomModal from '../modal';
import { RootState } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { openModal, closeModal } from './reducer/modal.reducer';
import { useModal } from '../hooks/useModal';

export default function CountModal(): JSX.Element {
	const { open, close } = useModal();
	const dispatch = useDispatch();
	const count = useSelector((state: RootState) => state.counter?.value);
	const isCountModalOpen = useSelector((state: RootState) => state.modal['countModal']?.isOpen);

	useEffect(() => {
		if (count && count > 10) {
			open('countModal');
		} else {
			close('countModal');
		}
	}, [count, dispatch]);

	return (
		<CustomModal isOpen={isCountModalOpen} onRequestClose={() => close('countModal')} width="400px" height="200px">
			<div>
				<h2>Title</h2>
				<p>Modal Content</p>
				<button onClick={() => close('countModal')}>Close Modal</button>
			</div>
		</CustomModal>
	);
}
