function temporizador(req, res, next) {
  const inicio = Date.now();
  res.on('finish', () => {
    const tempo = Date.now() - inicio;
    console.log(`Tempo de resposta: ${tempo} ms`);
  });
  next();
}
module.exports = temporizador;