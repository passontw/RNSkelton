import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
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

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(...middlewares),
    devToolsEnhancer(),
  ),
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type { RootState };
export type AppDispatch = typeof store.dispatch;
