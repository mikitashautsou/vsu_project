/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {string[]} requiredFields
 */
export const validateBody = (req, requiredFields = []) => {
  const unsetRequiredField = requiredFields.find(
    (rf) => req.body[rf] === undefined
  );
  if (unsetRequiredField) {
    throw new Error(`${unsetRequiredField} was not provided`);
  }
};
