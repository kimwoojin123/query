import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
	[key: string]: {
		isOpen: boolean;
		props?: any;
	} | null;
}

const initialState: ModalState = {
	countModal: null,
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<{ modalId: string; props?: any }>) => {
			const { modalId, props } = action.payload;
			state[modalId] = { isOpen: true, props: props };
		},
		closeModal: (state, action: PayloadAction<{ modalId: string }>) => {
			const { modalId } = action.payload;
			if (state[modalId]) {
				state[modalId] = null;
			}
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
