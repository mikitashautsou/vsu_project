import Form from "../../components/new-design/form.component";
import { BANK_SERVICE_URL, USERS_SERVICE_URL } from "../../config";
import { useAsyncEffect } from "../../hooks/use-async-effect.hook";
import { useState, useContext } from "react";
import { StateContext } from "../../state/state.context";
import { patch } from "../../api/patch";
import { post } from "../../api/post";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "../../api/get";

// await db.collection("sales").insertOne({
//     carId: carNo,
//     state: SALE_STATE.NEW,
//     price,
//     destinationAccountId,
//     ownerId: userId,
//   });

export const BuyCarPage = () => {
  const { saleId } = useParams();
  const [accounts, setAccounts] = useState([]);
  const state = useContext(StateContext);
  const navigate = useNavigate();
  useAsyncEffect(async () => {
    const { response: accounts } = await get({
      domain: BANK_SERVICE_URL,
      url: `/accounts/`,
      token: state.token,
    });
    setAccounts(accounts);
  });

  const [cars, setCars] = useState([]);
  useAsyncEffect(async () => {
    const { response: cars } = await get({
      url: `/cars/`,
      token: state.token,
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
    <Form
      entity={{ payerId: state.user._id }}
      title={"Sell car"}
      properties={[
        {
          key: "payerId",
          type: "select",
          title: "Payer",
          options: users.map((u) => ({
            title: `${u.username}`,
            value: u._id,
          })),
        },
        {
          key: "accountId",
          type: "select",
          title: "Payer account id",
          options: accounts.map((u) => ({
            title: `Account №${u._id}`,
            value: u._id,
          })),
        },
      ]}
      onSubmit={async (model) => {
        // if (model._id) {
        //   await patch({ url: `/cars/${model._id}`, token, body: model });
        // } else {
        //   await post({ url: `/cars`, token, body: model });
        // }
        await post({
          url: `/sales/${saleId}`,
          token: state.token,
          body: model,
        });
        navigate("/sales");
      }}
      cancelRoute={"/sales"}
    />
  );
};
