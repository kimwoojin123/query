import CounterReducer from './reducer/countslice.reducer';

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
	key: 'root',
	storage: storageSession,
	whiteList: ['Count'],
};

const rootReducer = combineReducers({
	counter: CounterReducer.reducer,
});

export default persistReducer(persistConfig, rootReducer);
