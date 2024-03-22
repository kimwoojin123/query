import CounterReducer from './reducer/countslice.reducer';
import modalReducer from './reducer/modal.reducer';

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
	key: 'root',
	storage: storageSession,
	whiteList: ['Count', 'Modal'],
};

const rootReducer = combineReducers({
	counter: CounterReducer.reducer,
	modal: modalReducer,
});

export default persistReducer(persistConfig, rootReducer);
