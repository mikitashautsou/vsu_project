export const createAPI = (backendURL, model, token) => {
  const api = {
    create: (newObject) =>
      fetch(`${backendURL}/${model.systemName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(newObject),
      }).then((res) => res.json()),
    list: () =>
      fetch(`${backendURL}/${model.systemName}`, {
        headers: {
          Authorization: token,
        },
      }).then((res) => res.json()),
    get: (id) =>
      fetch(`${backendURL}/${model.systemName}/${id}`, {
        headers: {
          Authorization: token,
        },
      }).then((res) => res.json()),
    update: (id, newObject) =>
      fetch(`${backendURL}/${model.systemName}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(newObject),
      }).then((res) => res.json()),
    delete: (id) =>
      fetch(`${backendURL}/${model.systemName}/${id}`, {
        headers: {
          Authorization: token,
        },
        method: "DELETE",
      }),
    execute: (actionName, args) =>
      fetch(`${backendURL}/${model.systemName}/${actionName}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(args),
        method: "POST",
      }),
  };

  return api;
};
