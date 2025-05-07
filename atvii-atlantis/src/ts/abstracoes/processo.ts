// classe abstrata Processo.ts
// Define a classe abstrata Processo, que serve como base para outros processos
// e contém métodos e propriedades comuns a todos os processos.
import Menu from "../interfaces/menu"
import Entrada from "../io/entrada"

export default abstract class Processo {
    protected opcao!: number
    protected menu!: Menu
    protected entrada = new Entrada()
    protected processo!: Processo
    protected execucao!: boolean
    public get Execucao(){
        return this.execucao
    }
    abstract processar(): void
}