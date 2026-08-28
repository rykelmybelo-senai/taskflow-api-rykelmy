const fs = require("fs");
const path = require("path");
const os = require("os");

console.log("=== AMBIENTE ===");
console.log("Node.js", process.version);
console.log("Sistema:", os.platform());
console.log("Pasta atual:", __dirname);

console.log('');
console.log("=== ARQUIVOS NA PASTA ===");
const arquivos = fs.readdirSync('.');
arquivos.forEach (arquivo => {
    console.log(' -', arquivo);
});

console.log('');
console.log('=== CAMINHO DO FUTURO SERVIDOR ===');
const caminhoServidor = path.join(__dirname, 'src', 'server.js');
console.log("O servidor ficara em:", caminhoServidor);

const arquivosJs = arquivos.filter(a => a.endsWith('.js'));
console.log('');
console.log(`Arquivos .js encontrados: ${arquivosJs.length}`);

const arquivosTaskFlow = fs.readdirSync('../taskflow/');
arquivosTaskFlow.forEach(arquivo => {
    console.log(' -', arquivo);
});

const arquivosJS1 = arquivosTaskFlow.filter(a => a.endsWith('.js'));
console.log('');
console.log(`Arquivos .js encontrados: ${arquivosJS1.length}`);