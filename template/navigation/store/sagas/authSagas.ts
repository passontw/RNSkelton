import { put, call } from 'redux-saga/effects';
import * as SecureStore from 'expo-secure-store';
import types from '../constants/actionTypes';

const SECURE_TOKEN_KEY = 'authToken';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  id: string;
  name: string;
  token: string;
}

const okSignIn = (data: LoginResponse) => ({
  type: types.SIGN_IN_SUCCESS,
  payload: {
    isAuth: true,
    user: { id: data.id, name: data.name },
  },
});

const errSignIn = (message: string) => ({
  type: types.SIGN_IN_ERROR,
  payload: { message },
});

async function loginApi(credentials: LoginCredentials): Promise<LoginResponse> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (credentials.username === 'demo' && credentials.password === 'password') {
    return { id: '1', name: 'Demo User', token: 'mock-jwt-token-' + Date.now() };
  }
  throw new Error('使用者名稱或密碼錯誤');
}

export function* signInSaga({ payload }: { payload: LoginCredentials }) {
  try {
    const response: LoginResponse = yield call(loginApi, payload);
    yield call([SecureStore, SecureStore.setItemAsync], SECURE_TOKEN_KEY, response.token);
    yield put(okSignIn(response));
  } catch (error: any) {
    yield put(errSignIn(error.message));
  }
}

export function* signOutSaga() {
  yield call([SecureStore, SecureStore.deleteItemAsync], SECURE_TOKEN_KEY);
  yield put({ type: types.SIGN_OUT });
}
