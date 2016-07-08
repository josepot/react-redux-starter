import { post } from '../server/';

const LOGIN_ERR_MSG = `
  The username or password you have entered is invalid.
`;

export function login(username, password) {
  return new Promise((resolve, reject) => {
    return post('/auth/login', { username, password })
    .then(json => resolve(json.meta))
    .then(null, () => reject(new Error(LOGIN_ERR_MSG)));
  });
}
