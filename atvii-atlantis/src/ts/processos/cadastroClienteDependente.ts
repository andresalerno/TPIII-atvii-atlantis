import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class CadastroDependente extends Processo {
    private titular!: Cliente;

    processar(): void {
        let armazem = Armazem.InstanciaUnica;

        // Listar titulares (clientes sem titular)
        const titulares = armazem.Clientes.filter(c => c.Titular === null);

        if (titulares.length === 0) {
            console.log("Não há titulares cadastrados para associar dependentes.");
            return;
        }

        console.log("Selecione o titular para o novo dependente:");
        titulares.forEach((titular, i) => {
            console.log(`${i} - ${titular.Nome} (${titular.NomeSocial})`);
        });

        let idx = this.entrada.receberNumero("Digite o número do titular:");

        if (idx < 0 || idx >= titulares.length) {
            console.log("Número inválido. Cancelando cadastro de dependente.");
            return;
        }

        this.titular = titulares[idx];

        // Dados do dependente
        let nome = this.entrada.receberTexto('Qual o nome do dependente?');
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do dependente?');
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento do dependente?');

        let dependente = new Cliente(nome, nomeSocial, dataNascimento);

        dependente.Titular = this.titular;
        this.titular.Dependentes.push(dependente);

        this.processo = new CadastroEnderecoTitular(dependente);
        this.processo.processar();

        this.processo = new CadastrarDocumentosCliente(dependente);
        this.processo.processar();

        armazem.Clientes.push(dependente);

        console.log('Dependente cadastrado com sucesso!');
    }
}
