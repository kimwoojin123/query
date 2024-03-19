import { configureStore } from '@reduxjs/toolkit';
import { persistStore, PERSIST } from 'redux-persist';
import counterReducer from './reducer/countslice.reducer';

const store = configureStore({
	reducer: {
		counter: counterReducer,
	},
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
