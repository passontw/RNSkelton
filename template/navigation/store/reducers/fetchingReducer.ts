import types from '../constants/actionTypes';
import initialState from './initialState';

type FetchingState = typeof initialState.fetching;

type Action = { type: string; payload?: string };

export default function fetchingReducer(
  fetching: FetchingState = { ...initialState.fetching },
  { type, payload }: Action,
): FetchingState {
  switch (type) {
    case types.START_FETCHING:
      return { pendingActionTypes: [...fetching.pendingActionTypes, payload!] };
    case types.STOP_FETCHING:
      return { pendingActionTypes: fetching.pendingActionTypes.filter(t => t !== payload) };
    default:
      return fetching;
  }
}
