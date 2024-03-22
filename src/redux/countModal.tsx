import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { useModal } from '../hooks/useModal';
import { RootState } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { openModal, closeModal } from './reducer/modal.reducer';

export default function CountModal(): JSX.Element {
	const { open, close } = useModal();
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
		<Modal size="md" placement="center" isOpen={isCountModalOpen}>
			<ModalContent>
				<ModalHeader>Title</ModalHeader>
				<ModalBody>Modal Content</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
}
