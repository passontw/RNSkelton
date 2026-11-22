import types from '../constants/actionTypes';

export const startFetchingAction = (actionType: string) => ({
  type: types.START_FETCHING,
  payload: actionType,
});

export const stopFetchingAction = (actionType: string) => ({
  type: types.STOP_FETCHING,
  payload: actionType,
});
