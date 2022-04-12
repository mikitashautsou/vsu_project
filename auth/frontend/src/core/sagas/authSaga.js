import { put, takeEvery, call } from 'redux-saga/effects';
import { actionFailid, signIn, signUpSuccess, singInSuccess } from '../reducers/authReducer';

function* signUpWorker({ payload }) {
  try {
    const response = yield call(() =>
      fetch(process.env.REACT_APP_BACKEND_URL+'/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).then((response) => response.json())
    );
    yield put(signUpSuccess({...response, userData:payload}));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* signUpSuccessWorker({payload}){
  try{
    const {userData} = payload
    yield put(signIn(userData))
  } catch({status, message}){
    yield put(actionFailid({status,message}))
  }
}

function* signInWorker({ payload }) {
  try {
    const response = yield call(() =>
      fetch(process.env.REACT_APP_BACKEND_URL+'/sign-in', {
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
  yield takeEvery('auth/signUpSuccess', signUpSuccessWorker)
}
