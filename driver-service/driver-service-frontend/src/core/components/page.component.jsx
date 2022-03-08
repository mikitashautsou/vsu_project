import { useContext, useMemo, useState } from "react";
import { StateContext } from "../../state/state.context";
import { createAPI } from "../api/createAPI";
import { Form } from "./form";
import { Table } from "./table.component";

export const Page = ({ baseUrl, model }) => {
  const { pageParams, token } = useContext(StateContext);
  const api = useMemo(
    () => createAPI(baseUrl, model, token),
    [baseUrl, model, token]
  );

  if (pageParams.type === "list") {
    return <Table api={api} model={model} />;
  }
  if (pageParams.type === "new") {
    return <Form api={api} model={model}></Form>;
  }
  if (pageParams.type === "edit") {
    return <Form api={api} model={model}></Form>;
  }
  return <>oops... this shouldn't have happened</>;
};
