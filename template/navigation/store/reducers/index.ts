import { combineReducers } from 'redux';
import auth from './authReducer';
import fetching from './fetchingReducer';

const appReducer = combineReducers({
  auth,
  fetching,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof appReducer>;

export default rootReducer;
