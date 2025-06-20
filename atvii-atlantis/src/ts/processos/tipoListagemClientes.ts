import Processo from "../abstracoes/processo";
import MenuTipoListagemClientes from "../menus/menuTipoListagemClientes";
import Principal from "./principal";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class TipoListagemClientes extends Processo {
    private processoAnterior: Processo | null;

    constructor(processoAnterior: Processo | null = null) {
        super();
        this.menu = new MenuTipoListagemClientes();
        this.processoAnterior = processoAnterior;
    }

    processar(): void {
        // Inicializar o armazém antes de qualquer lógica de listagem
        let armazem = Armazem.InstanciaUnica;

        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?');

        switch (this.opcao) {
            case 1:
                // Listar apenas os titulares (clientes que não têm titular associado)
                console.log("****************************");
                console.log("Listando Titulares...");
                let titulares = armazem.Clientes.filter(cliente => cliente.Titular === null); // Filtra apenas os titulares
                titulares.forEach(cliente => {
                    console.log(`Nome: ${cliente.Nome}`);
                    console.log(`Nome Social: ${cliente.NomeSocial}`);
                    console.log(`Data de Nascimento: ${cliente.DataNascimento.toLocaleDateString()}`);
                    console.log(`Endereço: ${cliente.Endereco ? cliente.Endereco.Rua : 'Não informado'}`);
                    console.log("Documentos:");
                    if (cliente.Documentos.length > 0) {
                        cliente.Documentos.forEach(doc => {
                            console.log(`${doc.Tipo}: ${doc.Numero}`);
                        });
                    } else {
                        console.log("Nenhum documento");
                    }
                    console.log("****************************");
                });
                break;
            
            case 2:
                // Listar dependentes de um titular específico
                console.log("****************************");
                console.log("Listando Dependentes...");
                armazem.Clientes.forEach(cliente => {
                    if (cliente.Dependentes.length > 0) {
                        console.log(`Titular: ${cliente.Nome}`);
                        console.log("*********");
                        cliente.Dependentes.forEach(dep => {
                            console.log(`Dependente: ${dep.Nome}`);
                            console.log(`Data de Nascimento: ${dep.DataNascimento.toLocaleDateString()}`);
                            // Verificando se o endereço do dependente existe
                            console.log(`Endereço: ${dep.Endereco ? dep.Endereco.Rua : 'Não informado'}`);
                            if (dep.Documentos.length > 0) {
                                console.log("Documentos:");
                                dep.Documentos.forEach(doc => {
                                    console.log(`${doc.Tipo}: ${doc.Numero}`);
                                });
                            } else {
                                console.log("Nenhum documento");
                            }
                            console.log("*********");
                        });
                    }
                });
                console.log("****************************");
                break;

            case 0:
                // Voltar para o processo anterior (Principal)
                if (this.processoAnterior) {
                    this.processoAnterior.processar();
                } else {
                    this.processo = new Principal(); // Volta para o menu principal
                    this.processo.processar();
                }
                break;

            default:
                console.log('Opção não entendida... :(');
        }
    }
}
