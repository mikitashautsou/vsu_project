import { useState, useEffect, useContext } from "react";
import { get } from "../../api/get";
import Table from "../../components/new-design/table.component";
import { useAsyncEffect } from "../../hooks/use-async-effect.hook";
import { StateContext } from "../../state/state.context";

import { useNavigate } from "react-router-dom";
import { USERS_SERVICE_URL } from "../../config";
import { del } from "../../api/delete";
const CarsPage = () => {
  const navigate = useNavigate();

  const [cars, setCars] = useState();
  const state = useContext(StateContext);
  useAsyncEffect(async () => {
    const { response: cars } = await get({
      token: state.token,
      url: `/cars`,
    });
    setCars(cars);
  });

  const [users, setUsers] = useState([]);
  useAsyncEffect(async () => {
    const { response: users } = await get({
      domain: USERS_SERVICE_URL,
      url: `/users/`,
      token: state.token,
    });
    setUsers(users);
  });

  return (
    <>
      <Table
        columns={[
          { title: "model", key: "model" },
          { title: "State", key: "state" },
          {
            title: "Owner",
            key: "ownerId",
            renderer: (ownerId) =>
              users.find((u) => u._id === ownerId)?.username,
          },
        ]}
        data={cars}
        actions={[
          {
            requireElevatedRoles: true,
            title: "New car",
            perform: () => navigate(`/cars/new`),
          },
        ]}
        rowActions={[
          {
            title: "Edit",
            requireElevatedRoles: true,

            perform: (car) => navigate(`/cars/${car._id}`),
          },
          {
            title: "Pay tax",
            renderIf: (car) => car.state === "new",
            perform: (car) => navigate(`/cars/${car._id}/pay-tax`),
          },
          {
            title: "Sell",
            perform: (car) => navigate(`/cars/${car._id}/sell`),
          },

          {
            title: "Delete",
            requireElevatedRoles: true,
            perform: async (car) => {
              await del({ url: `/cars/${car._id}`, token: state.token });
              const { response: cars } = await get({
                token: state.token,
                url: `/cars`,
              });
              setCars(cars);
            },
          },
        ]}
      />
    </>
  );
};

export default CarsPage;
