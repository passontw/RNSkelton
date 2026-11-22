import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { composeWithDevTools } from 'redux-devtools-expo-dev-plugin';
import rootReducer, { RootState } from './reducers';
import rootSaga from './sagas';
import {
  startFetchingMiddleware,
  stopFetchingMiddleware,
} from './middlewares/fetchingMiddleware';

const persistConfig = {
  storage: AsyncStorage,
  key: 'rn-skelton',
  blacklist: ['fetching'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  startFetchingMiddleware,
  sagaMiddleware,
  stopFetchingMiddleware,
];

const enhancer = __DEV__
  ? composeWithDevTools(applyMiddleware(...middlewares))
  : compose(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type { RootState };
export type AppDispatch = typeof store.dispatch;
