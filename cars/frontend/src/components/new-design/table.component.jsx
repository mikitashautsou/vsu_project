import { useContext } from "react";
import { StateContext } from "../../state/state.context";
const Table = ({ columns, data = [], actions = [], rowActions }) => {
  const { user } = useContext(StateContext);
  return (
    <>
      <table>
        <tbody>
          <tr>
            {columns.map((column) => (
              <th>{column.title}</th>
            ))}
          </tr>
          {data.map((row) => (
            <tr>
              {columns.map((c) => (
                <td>{!c.renderer ? row[c.key] : c.renderer(row[c.key])}</td>
              ))}
              {rowActions.length > 0
                ? rowActions
                    .filter(
                      (ra) =>
                        !ra.requireElevatedRoles || user.role !== "regular"
                    )
                    .filter((a) => !a.renderIf || a.renderIf(row))
                    .map((action) => (
                      <td>
                        <button onClick={() => action.perform(row)}>
                          {action.title}
                        </button>
                      </td>
                    ))
                : null}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {actions
          .filter((ra) => !ra.requireElevatedRoles || user.role !== "regular")
          .map((a) => (
            <button onClick={() => a.perform()}>{a.title}</button>
          ))}
      </div>
    </>
  );
};

export default Table;
