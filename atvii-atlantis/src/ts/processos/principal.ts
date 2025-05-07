import Processo from "../abstracoes/processo"
import MenuPrincipal from "../menus/menuPricipal"
import TipoCadastroCliente from "./tipoCadastroCliente"
import TipoListagemClientes from "./tipoListagemClientes"
import TipoEdicaoCliente from "./tipoEdicaoCliente"

export default class Principal extends Processo {
    constructor() {
        super()
        this.execucao = true
        this.menu = new MenuPrincipal()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        switch (this.opcao) {
            // Case 1: Cadastro do cliente, como: nome, nome social, data de nascimento,
            // endereço (classe: CadastroEnderecoTitular), documentos (classe: CadastrarDocumentosCliente), etc.
            case 1:
                this.processo = new TipoCadastroCliente(this)
                this.processo.processar()
                break
            case 2:
                this.processo = new TipoEdicaoCliente()
                this.processo.processar()
            case 3:
                this.processo = new TipoListagemClientes()
                this.processo.processar()
                break
            case 0:
                this.execucao = false
                console.log('Até logo!')
                console.clear()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}