import { put, takeEvery, call } from 'redux-saga/effects';
import {
  actionFailid,
  createLicenseSuccess,
  deleteLicenseSuccess,
  getLicenses,
  getLicensesSuccess,
  revokeLicenseSuccess,
  updateLicenseSuccess,
} from '../reducers/licensesReducer';

function* createLicenseWorker({ payload }) {
  try {
    const { token, userId, type } = payload;
    const response = yield call(() =>
      fetch(process.env.REACT_APP_BACKEND_URL + '/licenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({ userId, type }),
      }).then((response) => response.json())
    );
    yield put(createLicenseSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* getLicensesWorker({ payload }) {
  try {
    const response = yield call(() =>
      fetch(process.env.REACT_APP_BACKEND_URL + '/licenses', {
        headers: {
          'Content-Type': 'application/json',
          authorization: payload,
        },
      }).then((response) => response.json())
    );
    yield put(getLicensesSuccess(response));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* updateLicenseWorker({ payload }) {
  try {
    const { token, licenseId, type } = payload;
    const response = yield call(() =>
      fetch(process.env.REACT_APP_BACKEND_URL + `/licenses/${licenseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({ type }),
      }).then((response) => response.json())
    );
    yield put(updateLicenseSuccess(response));
    yield put(getLicenses(token));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* deleteLicenseWorker({ payload }) {
  try {
    const { token, licenseId } = payload;

    const response = yield call(() =>
      fetch(process.env.REACT_APP_BACKEND_URL + `/licenses/${licenseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      }).then((response) => response.json())
    );
    yield put(deleteLicenseSuccess(response));
    yield put(getLicenses(token));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* payTaxForLicenseWorker({ payload }) {
  try {
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

function* revokeLicenseWorker({ payload }) {
  try {
    const { token, licenseId } = payload;

    const response = yield call(() =>
      fetch(process.env.REACT_APP_BACKEND_URL + `/licenses/${licenseId}/revoke`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      }).then((response) => response.json())
    );
    yield put(revokeLicenseSuccess(response));
    yield put(getLicenses(token));
  } catch ({ status, message }) {
    yield put(actionFailid({ status, message }));
  }
}

export function* licensesSaga() {
  yield takeEvery('licenses/createLicense', createLicenseWorker);
  yield takeEvery('licenses/getLicenses', getLicensesWorker);
  yield takeEvery('licenses/updateLicense', updateLicenseWorker);
  yield takeEvery('licenses/deleteLicense', deleteLicenseWorker);
  yield takeEvery('licenses/payTaxForLicense', payTaxForLicenseWorker);
  yield takeEvery('licenses/revokeLicense', revokeLicenseWorker);
}
