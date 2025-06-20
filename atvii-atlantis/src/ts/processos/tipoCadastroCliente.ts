import Processo from "../abstracoes/processo";
import MenuTipoCadastroCliente from "../menus/menuTipoCadastroCliente";
import CadastroClienteTitular from "./cadastroClienteTitular";
import CadastroDependente from "./cadastroClienteDependente";

export default class TipoCadastroCliente extends Processo {
    private processoAnterior: Processo | null;

    constructor(processoAnterior: Processo | null = null) {
        super();
        this.menu = new MenuTipoCadastroCliente();
        this.processoAnterior = processoAnterior;
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual opção desejada?');
        
        switch (this.opcao) {
            case 1:
                this.processo = new CadastroClienteTitular();
                this.processo.processar();
                break;
            case 2:
                this.processo = new CadastroDependente();
                this.processo.processar();
                break;
            case 0:
                if (this.processoAnterior) {
                    this.processoAnterior.processar();
                }
                break;
            default:
                console.log('Opção inválida');
        }
    }
}
