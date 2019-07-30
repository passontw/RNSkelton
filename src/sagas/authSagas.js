import { put, call } from 'redux-saga/effects';
import types from '../constants/actionTypes';

const okLogin = () => ({
  type: types.LOGIN_SUCCESS,
});

const errLogin = ({ message, status }) => {
  return {
    type: types.LOGIN_ERROR,
    payload: {
      message: getErrorMessage(message)
    }
  };
};

export function* loginSaga({ payload }) {
  try {

    const resAction = true ? okLogin() : errLogin();

    yield put(resAction);
  } catch (error) {
    const errorAction = errLogin(error);
    yield put(errorAction);
  }
}