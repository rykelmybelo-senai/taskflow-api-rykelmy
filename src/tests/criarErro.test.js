//Criar do formatarTarefa.js depois, não esquecer.

const criarErro = require('../utils/criarErro');
//Para não executar de cara, foi criado um arrow function.
describe('criarErro', () => {
    test('devolve um Error com status e a mensagem', () => {
        const erro = criarErro(404, 'Tarefa não encontrada');

        expect(erro).toBeInstanceOf(Error);
        expect(erro.status).toBe(404);
        expect(erro.message).toBe('Tarefa não encontrada');
    });
});