const Table = ({ columns, data = [], actions, rowActions }) => {
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
                ? rowActions.map((action) => (
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
        {actions.map((a) => (
          <button onClick={() => a.perform()}>{a.title}</button>
        ))}
      </div>
    </>
  );
};

export default Table;
