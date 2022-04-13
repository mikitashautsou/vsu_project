import { put, takeEvery, call } from 'redux-saga/effects';
import {
  actionFailid,
  createAccountSuccess,
  deleteAccountSuccess,
  depositSuccess,
  getAllAccountsSuccess,
  getUserAccountsSuccess,
  updateAccountSuccess,
} from '../reducers/accountsReducer';

function* createAccountWorker({ payload }) {
  try {
    const { token, _id } = payload;
    const response = yield call(() =>
      fetch(process.env.REACT_APP_BACKEND_URL + `/users/${_id}/accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      }).then((response) => response.json())
    );
    yield put(createAccountSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* getAllAccountsWorker({ payload }) {
  try {
    const response = yield call(() =>
      fetch(process.env.REACT_APP_BACKEND_URL + '/accounts', {
        headers: {
          'Content-Type': 'application/json',
          authorization: payload,
        },
      }).then((response) => response.json())
    );
    yield put(getAllAccountsSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* getUserAccountsWorker({ payload }) {
  try {
    const { _id, token } = payload;
    const response = yield call(() =>
      fetch(process.env.REACT_APP_BACKEND_URL + `/users/${_id}/accounts`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      }).then((response) => response.json())
    );
    yield put(getUserAccountsSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* updateAccountWorker({ payload }) {
  try {
    const { token, userId, accountId, balance } = payload;
    const response = yield call(() =>
      fetch(process.env.REACT_APP_BACKEND_URL + `/users/${userId}/accounts/${accountId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({ balance }),
      }).then((response) => response.json())
    );
    yield put(updateAccountSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* depositWorker({ payload }) {
  try {
    const { token, userId, accountId, amount } = payload;
    const response = yield call(() =>
      fetch(process.env.REACT_APP_BACKEND_URL + `/users/${userId}/accounts/${accountId}/deposit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({ amount }),
      }).then((response) => response.json())
    );
    yield put(depositSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* deleteAccountWorker({ payload }) {
  try {
    const { token, userId, accountId } = payload;
    const response = yield call(() =>
      fetch(process.env.REACT_APP_BACKEND_URL + `/users/${userId}/accounts/${accountId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      }).then((response) => response.json())
    );
    yield put(deleteAccountSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

export function* accountsSaga() {
  yield takeEvery('accounts/createAccount', createAccountWorker);
  yield takeEvery('accounts/getAllAccounts', getAllAccountsWorker);
  yield takeEvery('accounts/getUserAccounts', getUserAccountsWorker);
  yield takeEvery('accounts/updateAccount', updateAccountWorker);
  yield takeEvery('accounts/deposit', depositWorker);
  yield takeEvery('accounts/deleteAccount', deleteAccountWorker);
}
