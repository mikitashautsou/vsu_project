import { all } from 'redux-saga/effects';
import { licensesSaga } from './licensesSaga';

export function* rootSaga() {
  yield all([licensesSaga()]);
}
