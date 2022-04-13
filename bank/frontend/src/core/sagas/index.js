import { all } from 'redux-saga/effects';
import { accountsSaga } from './accountsSaga';
import { transactionsSaga } from './transactionsSaga';

export function* rootSaga() {
  yield all([accountsSaga(), transactionsSaga()]);
}
