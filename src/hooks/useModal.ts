import { closeModal, openModal } from '../redux/reducer/modal.reducer';
import { useDispatch } from 'react-redux';

type CustomHookModal = {
	open: (modalId: string, props?: any) => void;
	close: (modalId: string) => void;
};

export function useModal(): CustomHookModal {
	const dispatch = useDispatch();

	function open(modalId: string, props: any = {}): void {
		dispatch(openModal({ modalId, props }));
	}

	function close(modalId: string): void {
		dispatch(closeModal({ modalId }));
	}

	return { open, close };
}
