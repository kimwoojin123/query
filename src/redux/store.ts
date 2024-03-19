import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import counterReducer from './reducer/countslice.reducer';
import persistReducer from './reducerCombine';

const store = configureStore({
	reducer: persistReducer,
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
