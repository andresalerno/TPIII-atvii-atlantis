// Importa a classe Singleton do arquivo onde ela está definida
import { Singleton } from './Singleton';

describe('Singleton', () => {

    // Teste 1: Verificar se existe apenas uma instância
    it('deve garantir que existe apenas uma instância', () => {
        // Chama o método para obter a instância
        const instancia1 = Singleton.obterInstancia();
        const instancia2 = Singleton.obterInstancia();

        // Verifica se as duas instâncias são a mesma
        expect(instancia1).toBe(instancia2);
    });

    // Teste 2: Verificar se o método 'fazerAlgo' é chamado corretamente
    it('deve chamar o método corretamente', () => {
        // Obtemos a instância única
        const instancia = Singleton.obterInstancia();

        // Criamos um "spy" para monitorar se o método 'fazerAlgo' foi chamado
        const spy = jest.spyOn(instancia, 'fazerAlgo');
        
        // Chamamos o método 'fazerAlgo'
        instancia.fazerAlgo();
        
        // Verificamos se o método foi chamado
        expect(spy).toHaveBeenCalled();
    });
});
