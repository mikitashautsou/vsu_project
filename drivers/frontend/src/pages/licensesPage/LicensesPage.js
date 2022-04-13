import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteLicense,
  getLicenses,
  payTaxForLicense,
  revokeLicense,
  updateLicense,
} from '../../core/reducers/licensesReducer';
import { Table } from '../../components/Table/Table';
import { Td } from '../../components/Table/styles/styled-table';
import { ButtonAdd, ButtonDelete, ButtonEdit, ButtonSuccess } from '../../styles/styled-buttons';

export const LicensesPage = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const licenses = useSelector((state) => state.licenses.licenses);

  const handleUpdateLicense = (licenseId) => {
    const type = prompt('Enter a new type');
    if (type) {
      dispatch(updateLicense({ token, licenseId, type }));
    }
  };

  const handleDeleteLicense = (licenseId) => {
    dispatch(deleteLicense({ token, licenseId }));
  };

  const handlePayTax = () => {
    dispatch(payTaxForLicense());
  };

  const handleRevokeLicense = (licenseId) => {
    dispatch(revokeLicense({ token, licenseId }));
  };

  useEffect(() => {
    dispatch(getLicenses(token));
  }, []);

  const tableBody = useMemo(() => {
    return licenses.map((license) => (
      <tr key={license._id}>
        <Td>{license._id}</Td>
        <Td>{license.type}</Td>
        <Td>{license.userId}</Td>
        <Td>{license.revoked ? 'Yes' : 'No'}</Td>
        <Td>
          <ButtonEdit onClick={() => handleUpdateLicense(license._id)}>Update License</ButtonEdit>
          <ButtonDelete onClick={() => handleDeleteLicense(license._id)}>
            Delete License
          </ButtonDelete>
          <br />
          <ButtonSuccess onClick={handlePayTax}>Pay Tax</ButtonSuccess>
          <ButtonDelete onClick={() => handleRevokeLicense(license._id)}>
            Revoke License
          </ButtonDelete>
        </Td>
      </tr>
    ));
  }, [licenses]);

  const tableHead = ['licenseId', 'Type', 'userId', 'Revoked', 'Actions'];

  return (
    <>
      <ButtonAdd>Create License</ButtonAdd>
      {tableBody.length !== 0 ? (
        <Table tableBody={tableBody} tableHead={tableHead} />
      ) : (
        <h1 style={{ textAlign: 'center' }}>You don't have access rights</h1>
      )}
    </>
  );
};
