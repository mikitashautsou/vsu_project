import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Input = ({
  type = "text",
  title,
  onChange: handleChange,
  state,
  options,
  propertyKey: key,
}) => {
  console.log({ state, key });
  if (type === "text") {
    return (
      <>
        <label for={`${key}`}>{title}:</label>
        <input
          required={true}
          onChange={handleChange}
          type="text"
          id={`${key}`}
          name={key}
          value={state[key]}
        ></input>
        <br />
      </>
    );
  } else if (type === "number") {
    return (
      <>
        <label for={`${key}`}>{title}:</label>
        <input
          required={true}
          onChange={handleChange}
          type='number'
          id={`${key}`}
          name={key}
          value={state[key]}
        ></input>
        <br />
      </>
    );
  } else if (type === "select") {
    return (
      <>
        <label for={key}>{title}:</label>

        <select
          required={true}
          name={key}
          id={key}
          value={state[key]}
          onChange={handleChange}
        >
          <option value={""}>-</option>
          {options.map((o) => (
            <option value={o.value}>{o.title}</option>
          ))}
        </select>
        <br />
      </>
    );
  }
};

const Form = ({
  entity = {},
  properties = [],
  title = "OOPS",
  cancelRoute,
  onSubmit: handleSubmit,
}) => {
  const navigate = useNavigate();
  const [state, setState] = useState({});

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(() => {
    setState(entity);
  }, [entity]);

  //   {
  //     key: "ownerId",
  //     type: "dynamic_select",
  //     title: "Owner",
  //     options: users.map((u) => ({
  //       title: u.username,
  //       value: u._id,
  //     })),
  //   },
  return (
    <form>
      <h1>{title}</h1>
      {properties.map((property) => (
        <Input
          propertyKey={property.key}
          onChange={handleChange}
          state={state}
          title={property.title}
          type={property.type}
          options={property.options}
        />
      ))}
      <br />

      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit(state);
        }}
      >
        Submit
      </button>
      <button
        onClick={(e) => {
          navigate(cancelRoute);
        }}
      >
        Cancel
      </button>
    </form>
  );
};

// {
//     key: 'model',
//     type: 'text'
// }

export default Form;
