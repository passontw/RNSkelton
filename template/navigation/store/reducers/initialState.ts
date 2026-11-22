const authState = {
  isAuth: false,
  user: {} as { id?: string; name?: string },
  message: '',
};

const fetchingState = {
  pendingActionTypes: [] as string[],
};

const initialState = {
  auth: authState,
  fetching: fetchingState,
};

export default initialState;
