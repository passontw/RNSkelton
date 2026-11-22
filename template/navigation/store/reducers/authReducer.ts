import types from '../constants/actionTypes';
import initialState from './initialState';

type AuthState = typeof initialState.auth;

type Action = { type: string; payload?: any };

export default function authReducer(
  auth: AuthState = { ...initialState.auth },
  { type, payload }: Action,
): AuthState {
  switch (type) {
    case types.SIGN_IN_SUCCESS:
      return { ...auth, ...payload, isAuth: true };
    case types.SIGN_IN:
    case types.SIGN_OUT:
      return { ...initialState.auth };
    case types.SIGN_IN_ERROR:
      return { ...initialState.auth, message: payload?.message ?? '' };
    default:
      return auth;
  }
}
