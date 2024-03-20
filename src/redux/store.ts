import { configureStore } from '@reduxjs/toolkit';
import { persistStore, FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE } from 'redux-persist';
import counterReducer from './reducer/countslice.reducer';
import persistReducer from './reducerCombine';

const store = configureStore({
	reducer: persistReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
