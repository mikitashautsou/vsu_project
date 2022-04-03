/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {object} body
 * @param {string[]} requiredFields
 */
export const validateBody = (req, res, body, requiredFields) => {
  const unsetRequiredField = requiredFields.find(
    (rf) => body[rf] === undefined
  );
  if (unsetRequiredField) {
    res.status(400).json({
      status: "error",
      message: `${unsetRequiredField} was not provided`,
    });
    return false;
  }
  return true;
};
