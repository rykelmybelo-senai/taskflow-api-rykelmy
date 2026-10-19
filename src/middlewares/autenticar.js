const jwt = require("jsonwebtoken");
const criarErro = require("../utils/criarErro");


function autenticar(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) throw criarErro(401, "Token não informado");

  const token = authHeader.split(" ")[1];
  if (!token)
    throw criarErro(401, "Formato inválido. Use: Bearer <token>");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = payload;

    next();
  } catch (erro) {
    if (erro.name === "TokenExpiredError")
      throw criarErro(401, "Token expirado. Faça login novamente.");

    console.log(erro)
        throw criarErro(401, "Token inválido.");
  }
}
module.exports = autenticar;
