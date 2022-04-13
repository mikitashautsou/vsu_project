import { put, takeEvery, call } from 'redux-saga/effects';
import {
  actionFailid,
  getAllTransactionsSuccess,
  getTransactionSuccess,
  transferSuccess,
} from '../reducers/transactionsReducer';

function* getAllTransactionsWorker({ payload }) {
  try {
    const { token, userId, accountId } = payload;

    const response = yield call(() =>
      fetch('http://localhost:4001' + `/users/${userId}/accounts/${accountId}/transactions`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      }).then((response) => response.json())
    );
    yield put(getAllTransactionsSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* getTransactionWorker({ payload }) {
  try {
    const { token, userId, accountId, transactionId } = payload;

    const response = yield call(() =>
      fetch(
        'http://localhost:4001' +
          `/users/${userId}/accounts/${accountId}/transactions/${transactionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
        }
      ).then((response) => response.json())
    );
    yield put(getTransactionSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* transferWorker({ payload }) {
  try {
    const {
      token,
      userId,
      fromAccountId: accountId,
      toAccountId: destinationAccountId,
      amount,
    } = payload;
    const body = { destinationAccountId, amount: Number(amount) };

    const response = yield call(() =>
      fetch('http://localhost:4001' + `/users/${userId}/accounts/${accountId}/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
    );
    yield put(transferSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

export function* transactionsSaga() {
  yield takeEvery('transactions/getAllTransactions', getAllTransactionsWorker);
  yield takeEvery('transactions/getTransaction', getTransactionWorker);
  yield takeEvery('transactions/transfer', transferWorker);
}
