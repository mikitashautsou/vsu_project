import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  deleteLicense,
  getLicenses,
  payTaxForLicense,
  revokeLicense,
  updateLicense,
} from '../../core/reducers/licensesReducer';
import { Table } from '../../components/Table/Table';
import { Td } from '../../components/Table/styles/styled-table';
import {
  Button,
  ButtonAdd,
  ButtonDelete,
  ButtonEdit,
  ButtonSuccess,
} from '../../styles/styled-buttons';
import { CREATE_LICENSE_PAGE } from '../AppRoutes';

export const LicensesPage = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const licenses = useSelector((state) => state.licenses.licenses);

  const navigate = useNavigate();
  const handleCreateLicense = () => {
    navigate(CREATE_LICENSE_PAGE);
  };

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

  const HOME_MENU_URL = 'http://localhost:4001';

  return (
    <>
      <a href={HOME_MENU_URL}>
        <Button>Home menu</Button>
      </a>
      <ButtonAdd onClick={handleCreateLicense}>Create License</ButtonAdd>
      {tableBody.length !== 0 ? (
        <Table tableBody={tableBody} tableHead={tableHead} />
      ) : (
        <h1 style={{ textAlign: 'center' }}>You don't have access rights</h1>
      )}
    </>
  );
};
