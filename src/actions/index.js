// Helper functions
function createTypes(base, types) {
  const res = {};
  types.forEach(type => { res[type] = `app/${base}/${type}`; });
  return res;
}

const action = (type, payload = {}, meta = {}) => ({ type, payload, meta });

// ACTIONS TYPES
export const COUNTER = createTypes('COUNTER', ['INCREASED', 'DECREASED']);
export const SESSION = createTypes('SESSION', ['LOGIN', 'LOGOUT']);
export const REQUEST = createTypes('REQUEST', ['START', 'SUCCESS', 'ERROR']);


// ACTION CREATORS
export const counter = {
  onIncrease: () => action(COUNTER.INCREASED),
  onDecrease: () => action(COUNTER.DECREASED),
};

export const session = {
  onLogin: (username, password) => action(SESSION.LOGIN, { username, password }),
  onLogout: () => action(SESSION.LOGOUT),
};

export const request = {
  onStart: (activity, path) => action(REQUEST.START, null, { activity, path }),
  onSuccess: (payload, activity, path) =>
    action(REQUEST.SUCCESS, payload, { activity, path }),
  onError: (error, activity, path) =>
    action(REQUEST.ERROR, error, { activity, path }),
};
