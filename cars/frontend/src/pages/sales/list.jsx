import { useState, useEffect, useContext } from "react";
import { get } from "../../api/get";
import Table from "../../components/new-design/table.component";
import { useAsyncEffect } from "../../hooks/use-async-effect.hook";
import { StateContext } from "../../state/state.context";

import { useNavigate } from "react-router-dom";
import { USERS_SERVICE_URL } from "../../config";
import { del } from "../../api/delete";
import { post } from "../../api/post";

const SalesPage = () => {
  const navigate = useNavigate();

  const [sales, setSales] = useState();
  const state = useContext(StateContext);
  useAsyncEffect(async () => {
    const { response: sales } = await get({
      token: state.token,
      url: `/sales`,
    });
    setSales(sales);
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

  const [cars, setCars] = useState([]);
  useAsyncEffect(async () => {
    const { response: cars } = await get({
      url: `/cars/`,
      token: state.token,
    });
    setCars(cars);
  });

  return (
    <>
      <Table
        columns={[
          {
            title: "Car",
            key: "carId",
            renderer: (carId) => {
              const car = cars.find((u) => u._id === carId);
              if (!car) {
                return "-";
              }
              const user = users.find((u) => u._id === car.ownerId);
              const owner = user?.username ?? "nobody";
              return `${car.model}-${car._id} of ${owner}`;
            },
          },

          {
            title: "State",
            key: "state",
          },
          {
            title: "Price",
            key: "price",
          },
          // {
          //   title: "Owner",
          //   key: "ownerId",
          //   renderer: (ownerId) =>
          //     users.find((u) => u._id === ownerId)?.username,
          // },
        ]}
        data={sales}
        rowActions={[
          {
            title: "Buy car",
            perform: async (sale) => {
              navigate(`/sales/${sale._id}`);
            },
          },
          {
            title: "Delete",
            perform: async (sale) => {
              await del({ url: `/sales/${sale._id}`, token: state.token });
              const { response: sales } = await get({
                token: state.token,
                url: `/sales`,
              });
              setSales(sales);
            },
          },
        ]}
      />
    </>
  );
};

export default SalesPage;
