import { useState, useEffect, useContext } from "react";
import { get } from "../../api/get";
import Table from "../../components/new-design/table.component";
import { useAsyncEffect } from "../../hooks/use-async-effect.hook";
import { StateContext } from "../../state/state.context";

import { useNavigate } from "react-router-dom";
import { USERS_SERVICE_URL } from "../../config";
import { del } from "../../api/delete";
const PoasPage = () => {
  const navigate = useNavigate();

  const [poas, setPoas] = useState();
  const state = useContext(StateContext);
  useAsyncEffect(async () => {
    const { response: poas } = await get({
      token: state.token,
      url: `/poas`,
    });
    setPoas(poas);
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
            title: "From user",
            key: "fromUserId",
            renderer: (ownerId) =>
              users.find((u) => u._id === ownerId)?.username,
          },

          {
            title: "To user",
            key: "toUserId",
            renderer: (ownerId) =>
              users.find((u) => u._id === ownerId)?.username,
          },
          {
            title: "Car",
            key: "carId",
            renderer: (ownerId) =>
              cars.find((u) => u._id === ownerId)?.model,
          },
          // {
          //   title: "Owner",
          //   key: "ownerId",
          //   renderer: (ownerId) =>
          //     users.find((u) => u._id === ownerId)?.username,
          // },
        ]}
        data={poas}
        actions={[
          {
            title: "New poa",
            perform: () => navigate(`/poas/new`),
          },
        ]}
        rowActions={[
          {
            title: "Edit",
            perform: (poa) => navigate(`/poas/${poa._id}`),
          },

          {
            title: "Delete",
            perform: async (poa) => {
              await del({ url: `/poas/${poa._id}`, token: state.token });
              const { response: poas } = await get({
                token: state.token,
                url: `/poas`,
              });
              setPoas(poas);
            },
          },
        ]}
      />
    </>
  );
};

export default PoasPage;
