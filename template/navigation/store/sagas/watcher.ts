import types from '../constants/actionTypes';
import { takeLatest } from 'redux-saga/effects';
import { signInSaga, signOutSaga } from './authSagas';

export function* watchSignInSaga() {
  yield takeLatest(types.SIGN_IN, signInSaga);
}

export function* watchSignOutSaga() {
  yield takeLatest(types.SIGN_OUT_REQUEST, signOutSaga);
}
