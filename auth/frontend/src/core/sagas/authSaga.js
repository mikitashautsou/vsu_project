import { put, takeEvery, call } from 'redux-saga/effects';
import { actionFailid, signUpSuccess, singInSuccess } from '../reducers/authReducer';

function* signUpWorker({ payload }) {
  try {
    const response = yield call(() =>
      fetch('/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).then((response) => response.json())
    );
    yield put(signUpSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* signInWorker({ payload }) {
  try {
    const response = yield call(() =>
      fetch('/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).then((response) => response.json())
    );

    yield put(singInSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

export function* authSaga() {
  yield takeEvery('auth/signUp', signUpWorker);
  yield takeEvery('auth/signIn', signInWorker);
}
