export const config = {
  PORT: 4000,
  SERVICE_MAPPING: {
    drivers: {
      protocol: "http",
      domain: "localhost",
      port: 4001,
    },
    auth: {
      protocol: "http",
      domain: "localhost",
      port: 4002,
    },
  },
};
