// Processo.ts - classe abstrata
// Define a classe abstrata Processo, que serve como base para outros processos
// e contém métodos e propriedades comuns a todos os processos.

import Menu from "../interfaces/menu";
import Entrada from "../io/entrada";
import { ProcessadorDocumento } from "../interfaces/ProcessadorDocumento";  // Importa a interface de CRUD de documentos

export default abstract class Processo {
    protected opcao!: number;
    protected menu!: Menu;
    protected entrada = new Entrada();
    protected processo!: Processo;
    protected execucao!: boolean;

    public get Execucao() {
        return this.execucao;
    }

    // Método abstrato que será implementado nas subclasses
    abstract processar(): void;

    // Método para gerenciar o CRUD de documentos
    protected gerenciarCrudDocumento(processo: ProcessadorDocumento, operacao: 'criar' | 'atualizar' | 'excluir'): void {
        switch (operacao) {
            case 'criar':
                processo.criar();
                break;
            case 'atualizar':
                processo.atualizar();
                break;
            case 'excluir':
                processo.excluir();
                break;
            default:
                console.log('Operação inválida.');
        }
    }
}
