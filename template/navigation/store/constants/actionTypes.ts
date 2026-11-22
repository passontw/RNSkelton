const syncActionTypes = [
  'SIGN_OUT',
  'SIGN_OUT_REQUEST',
  'START_FETCHING',
  'STOP_FETCHING',
] as const;

export const basicAsyncActionTypes = [
  'SIGN_IN',
] as const;

export const asyncActionTypes = basicAsyncActionTypes.reduce<string[]>((result, actionType) => {
  return [
    ...result,
    actionType,
    `${actionType}_SUCCESS`,
    `${actionType}_ERROR`,
  ];
}, []);

const allTypes = [...asyncActionTypes, ...syncActionTypes] as const;

type SyncType = typeof syncActionTypes[number];
type AsyncType = typeof asyncActionTypes[number];
type ActionTypeKey = SyncType | AsyncType;

const types = allTypes.reduce<Record<string, string>>((acc, key) => {
  acc[key] = key;
  return acc;
}, {}) as Record<ActionTypeKey, string>;

export default types;
