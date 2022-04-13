import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLicenses } from '../../core/reducers/licensesReducer';
import { Table } from '../../components/Table/Table';
import { Td } from '../../components/Table/styles/styled-table';
import { ButtonAdd, ButtonDelete, ButtonEdit, ButtonSuccess } from '../../styles/styled-buttons';

export const LicensesPage = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const licenses = useSelector((state) => state.licenses.licenses);

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
          <ButtonEdit>Update License</ButtonEdit>
          <ButtonDelete>Delete License</ButtonDelete>
          <br/>
          <ButtonSuccess>Pay Tax</ButtonSuccess>
          <ButtonDelete>Revoke License</ButtonDelete>
        </Td>
      </tr>
    ));
  }, [licenses]);

  const tableHead = ['licenseId', 'Type', 'userId', 'Revoked', 'Actions'];

  return (
    <>
      <ButtonAdd>Create License</ButtonAdd>
      <Table tableBody={tableBody} tableHead={tableHead} />
    </>
  );
};
