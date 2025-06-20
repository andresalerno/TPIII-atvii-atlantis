import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";
import ImpressorDocumento from "./impressorDocumento";
import ImpressorEndereco from "./impressorEndereco";

export default class ImpressaorCliente implements Impressor {
    private cliente: Cliente;
    private impressor!: Impressor;

    constructor(cliente: Cliente) {
        this.cliente = cliente;
    }

    imprimir(): void {  // Garantindo que não retorna nada
        // Organizando os dados do cliente em um objeto
        const clienteData = {
            "Nome": this.cliente.Nome,
            "Nome Social": this.cliente.NomeSocial,
            "Data de Nascimento": this.cliente.DataNascimento.toLocaleDateString(),
            "Data de Cadastro": this.cliente.DataCadastro.toLocaleDateString(),
        };

        // Exibindo os dados do cliente usando console.table
        console.log("Dados Cadastrais do Cliente:");
        console.table([clienteData]);

        // Imprimindo o endereço
        
        if (this.cliente.Endereco) {
            this.impressor = new ImpressorEndereco(this.cliente.Endereco);
            const enderecoData = this.impressor.imprimir();  // Retorna um objeto

            // Exibindo o endereço usando console.table
            console.log("Endereços do Cliente:");
            console.table([enderecoData]); // Exibe o objeto como uma tabela
        } else {
            console.log("Endereço do cliente não está disponível.");
        }

        // Imprimindo os documentos
        this.impressor = new ImpressorDocumento(this.cliente.Documentos);
        const documentosData = this.impressor.imprimir();  // Retorna um array de objetos

        // Exibindo os documentos usando console.table
        console.log("Documentos do Cliente:");
        console.table(documentosData); // Exibe os documentos como uma tabela

        // Garantindo que não haja retorno de valor ou `undefined` ao final
    }
}
