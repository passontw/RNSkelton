import types from '../constants/actionTypes';

export const signInAction = (payload: { username: string; password: string }) => ({
  type: types.SIGN_IN,
  payload,
});

export const signOutAction = () => ({
  type: types.SIGN_OUT_REQUEST,
});
