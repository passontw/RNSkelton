import { Middleware } from 'redux';
import { startFetchingAction, stopFetchingAction } from '../actions/globalActions';
import { basicAsyncActionTypes } from '../constants/actionTypes';

const responseRegExp = /_SUCCESS|_ERROR/;

export const startFetchingMiddleware: Middleware = store => next => action => {
  if (action && action.type) {
    const isBasicAsyncAction = (basicAsyncActionTypes as readonly string[]).includes(action.type);
    if (isBasicAsyncAction) {
      store.dispatch(startFetchingAction(action.type));
    }
    return next(action);
  }
};

export const stopFetchingMiddleware: Middleware = store => next => action => {
  if (action && action.type) {
    const isResponseAction = responseRegExp.test(action.type);
    const basicType = action.type.replace(responseRegExp, '');
    const isBasicAsyncAction = (basicAsyncActionTypes as readonly string[]).includes(basicType);
    if (isBasicAsyncAction && isResponseAction) {
      store.dispatch(stopFetchingAction(basicType));
    }
    return next(action);
  }
};
