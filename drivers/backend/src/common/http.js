import fetch from "node-fetch";

/**
 *
 * @param {{ headers?: object, url: string }} config
 * @returns
 */
export const get = async (config) => {
  config.headers = config.headers ?? {};
  const response = await fetch(config.url, {
    method: "get",
    headers: {
      ...config.headers,
    },
  });
  return await response.json();
};

/**
 *
 * @param {{ headers?: object, body?: object, url: string}} config
 * @returns {Promise<any>}
 */
export const post = async (config) => {
  config.headers = config.headers ?? {};
  config.body = config.body ?? {};
  const response = await fetch(config.url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    body: JSON.stringify(config.body),
  });
  return await response.json();
};
