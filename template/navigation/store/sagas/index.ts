import { fork, all } from 'redux-saga/effects';
import * as Watchers from './watcher';

export default function* rootSaga() {
  const sagas: any[] = [];
  for (const key in Watchers) {
    sagas.push(fork((Watchers as any)[key]));
  }
  yield all(sagas);
}
