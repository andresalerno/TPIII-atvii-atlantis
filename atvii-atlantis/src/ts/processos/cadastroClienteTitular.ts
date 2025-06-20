import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class CadastroClienteTitular extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um novo cliente titular...');
        let nome = this.entrada.receberTexto('Qual o nome do novo cliente titular?');
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente titular?');
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?');

        let cliente = new Cliente(nome, nomeSocial, dataNascimento);

        this.processo = new CadastroEnderecoTitular(cliente);
        this.processo.processar();

        this.processo = new CadastrarDocumentosCliente(cliente);
        this.processo.processar();

        let armazem = Armazem.InstanciaUnica;
        armazem.Clientes.push(cliente);

        console.log('Cliente Titular cadastrado com sucesso!');
    }
}
