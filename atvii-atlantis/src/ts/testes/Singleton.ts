// Definindo a classe Singleton

export class Singleton {
    private static instanciaUnica: Singleton;

    // Construtor privado para evitar criação de instâncias externas
    private constructor() {
        console.log('Instância criada!');
    }

    // Método para obter a instância única
    public static obterInstancia(): Singleton {
        if (!Singleton.instanciaUnica) {
            Singleton.instanciaUnica = new Singleton();
        }
        return Singleton.instanciaUnica;
    }

    // Método para teste
    public fazerAlgo(): void {
        console.log('Fazendo algo...');
    }
}
