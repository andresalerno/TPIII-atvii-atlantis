import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import MenuTipoDocumento from "../menus/menuTipoDocumento";
import CadastroCpf from "./cadastroCpf";
import CadastroRg from "./cadastroRg";
import CadastroPassaporte from "./cadastroPassaporte";

export default class EditarDocumentosCliente extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.menu = new MenuTipoDocumento();
        this.execucao = true;
    }

    processar(): void {
        console.log('Iniciando a edição de documentos do cliente...');

        while (this.execucao) {
            // Exibir os documentos do cliente para edição
            if (this.cliente.Documentos.length > 0) {
                console.log('Documentos existentes do cliente:');
                console.table(this.cliente.Documentos.map((doc, index) => ({
                    'ID': index,
                    'Tipo': doc.Tipo,
                    'Número': doc.Numero,
                    'Data de Expedição': doc.DataExpedicao.toLocaleDateString()
                })));
            } else {
                console.log('Este cliente não possui documentos cadastrados.');
            }

            // Mostrar menu de opções
            this.menu.mostrar();
            this.opcao = this.entrada.receberNumero('Qual opção desejada?');

            switch (this.opcao) {
                case 1:
                    // Editar documento CPF
                    const cpfIndex = this.entrada.receberNumero('Escolha o número do CPF para editar:');
                    const cpfDoc = this.cliente.Documentos[cpfIndex];
                    if (cpfDoc && cpfDoc.Tipo === "Cadastro de Pessoas Física") {
                        this.processo = new CadastroCpf(this.cliente, cpfDoc);  // Passa o CPF para edição
                        this.processo.processar();
                    } else {
                        console.log('Documento CPF não encontrado ou tipo inválido.');
                    }
                    break;

                case 2:
                    // Editar documento RG
                    const rgIndex = this.entrada.receberNumero('Escolha o número do RG para editar:');
                    const rgDoc = this.cliente.Documentos[rgIndex];
                    if (rgDoc && rgDoc.Tipo === "Registro Geral") {
                        this.processo = new CadastroRg(this.cliente, rgDoc);  // Passa o RG para edição
                        this.processo.processar();
                    } else {
                        console.log('Documento RG não encontrado ou tipo inválido.');
                    }
                    break;

                case 3:
                    // Editar documento Passaporte
                    const passaporteIndex = this.entrada.receberNumero('Escolha o número do Passaporte para editar:');
                    const passaporteDoc = this.cliente.Documentos[passaporteIndex];
                    if (passaporteDoc && passaporteDoc.Tipo === "Passaporte") {
                        this.processo = new CadastroPassaporte(this.cliente, passaporteDoc);  // Passa o Passaporte para edição
                        this.processo.processar();
                    } else {
                        console.log('Documento Passaporte não encontrado ou tipo inválido.');
                    }
                    break;

                case 0:
                    this.execucao = false;
                    break;

                default:
                    console.log('Opção não entendida :(');
            }
        }
    }
}
