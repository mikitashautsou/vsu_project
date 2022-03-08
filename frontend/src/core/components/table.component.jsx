import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../state/state.context";

const Property = ({ entity, property }) => {
  if (property.type === "foreign") {
    return <>{entity[`${property.name}_label`]}</>;
  }
  return <>{entity[property.name]}</>;
};

export const Table = ({ api, model }) => {
  const [entities, setEntities] = useState();
  const { setPageParams } = useContext(StateContext);
  useEffect(() => {
    api.list().then((list) => {
      setEntities(list);
    });
  }, [api]);
  if (!entities) {
    return <div>Loading {model.systemName}</div>;
  }
  console.log(model.actions);
  return (
    <div className="table">
      <b>{model.name}</b>
      <table>
        <tr>
          {model.properties.map((p) => (
            <th>{p.title}</th>
          ))}
        </tr>
        {entities.map((entity) => (
          <tr>
            {model.properties.map((p) => (
              <td>
                <Property entity={entity} property={p} />
              </td>
            ))}
            <td>
              <button
                onClick={() => setPageParams({ type: "edit", id: entity._id })}
              >
                edit
              </button>
              <button
                onClick={() => {
                  api.delete(entity._id).then(() => {
                    api.list().then((list) => {
                      setEntities(list);
                    });
                  });
                }}
              >
                remove
              </button>
            </td>
            {model.actions
              .filter((a) => a.type === "per-row")
              .map((action) => (
                <button
                  onClick={() => {
                    api.execute(action.systemName, { entity });
                  }}
                >
                  {action.name}
                </button>
              ))}
          </tr>
        ))}
      </table>
      <div>
        <button onClick={() => setPageParams({ type: "new" })}>ADD</button>
        {model.actions
          .filter((a) => a.type === "standalone")
          .map((action) => (
            <button
              onClick={() => {
                api.execute(action.systemName);
              }}
            >
              {action.name}
            </button>
          ))}
      </div>
    </div>
  );
};
