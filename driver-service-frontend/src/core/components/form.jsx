import { useCallback, useContext, useEffect, useState } from "react";
import { SERVICE_URL_MAPPING } from "../../config/constants";
import { StateContext } from "../../state/state.context";

const SelectForeignEntity = ({ name, onInput, formValues, model }) => {
  const { token } = useContext(StateContext);
  const [options, setOptions] = useState([]);
  const property = model.properties.find((p) => p.name === name);
  const { target } = property;
  useEffect(() => {
    (async () => {
      const foreignEntities = await fetch(
        `${SERVICE_URL_MAPPING[target.service]}/${target.model}`,
        {
          headers: {
            Authorization: token,
          },
        }
      ).then((res) => res.json());
      setOptions(
        foreignEntities.map((fe) => ({ _id: fe._id, label: fe.display_as }))
      );
    })();
  }, [target, token]);
  return (
    <select
      name={property.name}
      value={formValues[property.name]}
      onChange={onInput}
    >
      {options.map((option) => (
        <option value={option._id}>{option.label}</option>
      ))}
    </select>
  );
};
const Input = ({ name, type, onInput, formValues, model }) => {
  if (type === "boolean") {
    return (
      <input
        name={name}
        type="checkbox"
        onInput={onInput}
        value={formValues[name]}
      ></input>
    );
  }
  if (type === "foreign") {
    return (
      <SelectForeignEntity
        formValues={formValues}
        model={model}
        name={name}
        onInput={onInput}
      />
    );
  }
  return (
    <input
      name={name}
      type={type}
      onInput={onInput}
      value={formValues[name]}
    ></input>
  );
};

export const Form = ({ model, api }) => {
  const { pageParams, setPageParams } = useContext(StateContext);
  const [values, setValues] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!pageParams.id) {
      setLoading(false);
    } else {
      api.get(pageParams.id).then((entity) => {
        setValues(entity);
      });
      setLoading(false);
    }
  }, [pageParams, api]);

  const handleInput = useCallback(
    (event) => {
      const { target } = event;
      if (target.type === "checkbox") {
        setValues({
          ...values,
          [event.target.name]: target.checked,
        });
      } else {
        setValues({
          ...values,
          [event.target.name]: event.target.value,
        });
      }
    },
    [values, setValues]
  );
  if (isLoading) {
    return <div>Loading form...</div>;
  }
  return (
    <div className="form">
      <div>
        {pageParams.id ? "Edit " : "Add "}
        {model.name}
      </div>
      {model.properties.map((p) => (
        <div className="property">
          <span>{p.title}: </span>
          <Input
            name={p.name}
            type={p.type}
            onInput={handleInput}
            formValues={values}
            model={model}
          />
        </div>
      ))}
      <button
        onClick={async () => {
          console.log(values);
          if (!pageParams.id) {
            await api.create(values);
          } else {
            await api.update(pageParams.id, values);
          }
          setPageParams({ type: "list" });
        }}
      >
        Save
      </button>
      <button onClick={() => setPageParams({ type: "list" })}>Cancel</button>
    </div>
  );
};
