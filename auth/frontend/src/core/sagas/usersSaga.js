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
    const { token, fetchPayload } = payload;
    const response = yield call(() =>
      fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify(fetchPayload),
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
    const response = yield call(() =>
      fetch(`/users/${payload}`).then((response) => response.json())
    );
    yield put(getUserSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* updateUserWorker({ payload }) {
  try {
    const response = yield call(() =>
      fetch(`/users/${payload._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).then((response) => response.json())
    );
    yield put(updateUserSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* deleteUserWorker({ payload }) {
  try {
    const { _id, ...fetchPayload } = payload;
    const response = yield call(() =>
      fetch(`/users/${payload._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fetchPayload),
      }).then((response) => response.json())
    );
    yield put(deleteUserSuccess(response));
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
