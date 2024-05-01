/* URL NOT FOUND CONTROLLER */

export const urlNotFound = (req, res, next) => {
  return res.status(404).send("404 PAGE NOT FOUND");
};
