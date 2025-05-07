import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class CadastroDependente extends Processo {
    private titular: Cliente;

    constructor(titular: Cliente) {
        super();
        this.titular = titular;  // O dependente será associado a um titular
    }

    processar(): void {
        console.log('Iniciando o cadastro de um novo dependente...');

        // Coletando dados do dependente
        let nome = this.entrada.receberTexto('Qual o nome do dependente?');
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do dependente?');
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento do dependente?');

        // Criando o cliente dependente
        let dependente = new Cliente(nome, nomeSocial, dataNascimento);

        // Associando o dependente ao titular
        dependente.Titular = this.titular;

        // Processo de cadastro do endereço (reutilizando a lógica do titular)
        this.processo = new CadastroEnderecoTitular(dependente);
        this.processo.processar();

        // Processo de cadastro de documentos (reutilizando a lógica do titular)
        this.processo = new CadastrarDocumentosCliente(dependente);
        this.processo.processar();

        // Armazenando o dependente
        let armazem = Armazem.InstanciaUnica;
        armazem.Clientes.push(dependente);

        console.log('Finalizando o cadastro do dependente...');
    }
}
