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

const CarEditPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(StateContext);

  const [car, setCar] = useState({});
  useAsyncEffect(async () => {
    if (carId === "new") {
      return;
    }
    const { response: car } = await get({
      url: `/cars/${carId}`,
      token,
    });
    setCar(car);
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

  return (
    <Form
      entity={car}
      title={carId === "new" ? "Create a car" : "Edit car"}
      properties={[
        {
          key: "model",
          type: "text",
          title: "Model",
        },
        {
          key: "ownerId",
          type: "select",
          title: "Owner",
          options: users.map((u) => ({
            title: u.username,
            value: u._id,
          })),
        },
        {
          key: "state",
          type: "select",
          title: "State",
          options: [
            {
              title: "new",
              value: "new",
            },
            {
              title: "Stolen",
              value: "stolen",
            },
            {
              title: "OK",
              value: "tax-paid",
            },
            {
              title: "On sale",
              value: "on-sale",
            },
          ],
        },
      ]}
      onSubmit={async (model) => {
        if (model._id) {
          await patch({ url: `/cars/${model._id}`, token, body: model });
        } else {
          await post({ url: `/cars`, token, body: model });
        }
        navigate("/cars");
      }}
      cancelRoute={"/cars"}
    />
  );
};

export default CarEditPage;
