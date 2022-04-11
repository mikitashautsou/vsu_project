import { put, takeEvery, call } from 'redux-saga/effects';
import {
  actionFailid,
  createUserSuccess,
  deleteUserSuccess,
  getUsersSuccess,
  getUserSuccess,
  updateUserSuccess,
} from '../reducers/usersReducer';

const ERROR_STATUS = 'error';

function* createUserWorker({ payload }) {
  try {
    const { token, user } = payload;

    const response = yield call(() =>
      fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify(user),
      }).then((response) => response.json())
    );
    yield put(createUserSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* getUsersWorker({ payload }) {
  try {
    const response = yield call(() =>
      fetch('/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: payload,
        },
      }).then((response) => response.json())
    );
    if (response.status === ERROR_STATUS) {
      yield put(actionFailid({ status: response.status, message: response.message }));
    } else {
      yield put(getUsersSuccess(response));
    }
  } catch ({ status, message }) {
    console.log(message);
    yield put(actionFailid({ status, message }));
  }
}

function* getUserWorker({ payload }) {
  try {
    const {_id, token} = payload
    const response = yield call(() =>
      fetch(`/users/${_id}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      }).then((response) => response.json())
    );
    yield put(getUserSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* updateUserWorker({ payload }) {
  try {
    const { token, user } = payload;
    const { _id, ...data } = user;
    const response = yield call(() =>
      fetch(`/users/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify(data),
      }).then((response) => response.json())
    );
    yield put(updateUserSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* deleteUserWorker({ payload }) {
  try {
    const { token, user } = payload;
    const { _id, ...data } = user;
    const response = yield call(() =>
      fetch(`/users/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify(data),
      }).then((response) => response.json())
    );
    yield put(deleteUserSuccess({ response, _id }));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

export function* usersSaga() {
  yield takeEvery('users/createUser', createUserWorker);
  yield takeEvery('users/getUsers', getUsersWorker);
  yield takeEvery('users/getUser', getUserWorker);
  yield takeEvery('users/updateUser', updateUserWorker);
  yield takeEvery('users/deleteUser', deleteUserWorker);
}
