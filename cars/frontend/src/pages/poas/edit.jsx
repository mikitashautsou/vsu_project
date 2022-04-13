import { useState, useEffect, useContext } from "react";
import { get } from "../../api/get";
import Table from "../../components/new-design/table.component";
import { useAsyncEffect } from "../../hooks/use-async-effect.hook";
import { StateContext } from "../../state/state.context";
import { useParams } from "react-router-dom";
import Form from "../../components/new-design/form.component";
import { USERS_SERVICE_URL } from "../../config";
import { patch } from "../../api/patch";
import { useNavigate } from "react-router-dom";
import { post } from "../../api/post";

const PoaEditPage = () => {
  const { poaId } = useParams();
  const navigate = useNavigate();
  const {
    token,
    user: { role, _id },
  } = useContext(StateContext);

  const [poa, setPoa] = useState({});
  useAsyncEffect(async () => {
    if (poaId === "new") {
      return;
    }
    const { response: poa } = await get({
      url: `/poas/${poaId}`,
      token,
    });
    setPoa(poa);
  });

  const [users, setUsers] = useState([]);
  useAsyncEffect(async () => {
    const { response: users } = await get({
      domain: USERS_SERVICE_URL,
      url: `/users/`,
      token,
    });
    setUsers(users);
  });

  const [cars, setCars] = useState([]);
  useAsyncEffect(async () => {
    const { response: cars } = await get({
      url: `/cars/`,
      token,
    });
    setCars(cars);
  });

  console.log(
    "hhhheras",
    users.filter(
      (u) =>
        (role !== "regular" && role !== "policeman" && role !== "accountant") ||
        u._id === _id
    )
  );

  return (
    <Form
      entity={poa}
      title={
        poaId === "new" ? "Create Power of Attorney" : "Edit Power of Attorney"
      }
      properties={[
        {
          key: "fromUserId",
          type: "select",
          title: "From user",
          options: users
            .filter(
              (u) =>
                (role !== "regular" &&
                  role !== "policeman" &&
                  role !== "accountant") ||
                u._id === _id
            )
            .map((u) => ({
              title: u.username,
              value: u._id,
            })),
        },
        {
          key: "targetUserId",
          type: "select",
          title: "Target User",
          options: users.map((u) => ({
            title: u.username,
            value: u._id,
          })),
        },
        {
          key: "carId",
          type: "select",
          title: "Car",
          options: cars.map((u) => ({
            title: u.model,
            value: u._id,
          })),
        },
      ]}
      onSubmit={async (model) => {
        console.log("saving...", model);
        if (model._id) {
          await patch({ url: `/poas/${model._id}`, token, body: model });
        } else {
          await post({ url: `/poas`, token, body: model });
        }
        navigate("/poas");
      }}
      cancelRoute={"/poas"}
    />
  );
};

export default PoaEditPage;
