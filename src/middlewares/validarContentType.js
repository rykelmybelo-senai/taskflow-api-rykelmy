const criarErro = require("../utils/criarErro");


function validarContentType(req, res, next) {
  const metodosComBody = ["POST", "PUT", "PATCH"];
  if (metodosComBody.includes(req.method)) {
    const contentType = req.headers["content-type"];
    if (!contentType || !contentType.includes("application/json")) {
      throw criarErro(415, "Content-Type inválido. Use: application/json");
    }
  }
  next();
}
module.exports = validarContentType;