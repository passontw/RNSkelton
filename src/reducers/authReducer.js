import types from '../constants/actionTypes';
import { authState } from './initialState';

export default function reducer(auth = authState, { type, payload }) {
  console.log("TCL: reducer -> auth", auth)
  switch (type) {
    case types.LOGIN_SUCCESS:
      return auth.merge({isAuth: true});
    case types.LOGIN:
    case types.LOGIN_ERROR:
    default:
      return auth;
  }
}
