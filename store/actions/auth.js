export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
  return dispatch => {
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCS6et2XxcAeI3gL2XnKvGN6iqAZP2Hyv8',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    )
      .then(response => response.json())
      .then(dispatch({ type: SIGNUP }))
      .catch(err => {
        throw new Error('Signup went wrong!');
      })
  }
};
export const login = (email, password) => {
  return dispatch => {
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCS6et2XxcAeI3gL2XnKvGN6iqAZP2Hyv8',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    )
      .then(response => response.json())
      .then(dispatch({ type: LOGIN }))
      .catch(err => {
        throw new Error('Login went wrong!', err);
      })
  }
};
