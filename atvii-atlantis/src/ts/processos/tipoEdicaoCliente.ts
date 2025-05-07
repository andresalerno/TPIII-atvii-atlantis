// principal.ts (atualizado)
import Processo from "../abstracoes/processo";
import MenuPrincipal from "../menus/menuPricipal";
import TipoCadastroCliente from "./tipoCadastroCliente";
import TipoEdicaoCliente from "./tipoEdicaoCliente";

export default class Principal extends Processo {
    constructor() {
        super();
        this.execucao = true;
        this.menu = new MenuPrincipal();
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual opção desejada?');

        switch (this.opcao) {
            case 2:
                this.processo = new TipoEdicaoCliente();  // Chamando a edição
                this.processo.processar();
                break;
            default:
                console.log('Opção não entendida :(');
        }
    }
}
