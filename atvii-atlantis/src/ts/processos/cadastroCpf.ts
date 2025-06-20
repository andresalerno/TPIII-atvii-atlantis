import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import MenuCadastroCpf from "../menus/MenuCadastroCpf";

export default class CadastroCpf extends Processo {
    private cliente: Cliente;
    private documento: Documento;

    constructor(cliente: Cliente, documento: Documento | null = null) {
        super();
        this.cliente = cliente;
        this.documento = documento || new Documento("", TipoDocumento.CPF, new Date());  // Se não houver documento, cria um novo
        this.menu = new MenuCadastroCpf();
    }

    // Criar um novo documento CPF
    criar(): void {
        console.log('Criando um novo documento CPF...');
        const numero = this.entrada.receberTexto('Qual o número do CPF?');
        const dataExpedicao = this.entrada.receberData('Qual a data de expedição do CPF?');

        this.documento.Numero = numero;
        this.documento.DataExpedicao = dataExpedicao;

        // Adicionando o documento ao cliente
        this.cliente.Documentos.push(this.documento);
        console.log('Documento CPF criado com sucesso!');
    }

    // Atualizar um documento CPF existente
    atualizar(): void {
        console.log('Atualizando o documento CPF...');

        // Atualiza os dados do documento com base no que foi passado
        const novoNumero = this.entrada.receberTexto(`Qual o novo número do CPF? (atual: ${this.documento.Numero})`);
        const novaDataExpedicao = this.entrada.receberData(`Qual a nova data de expedição? (atual: ${this.documento.DataExpedicao.toLocaleDateString()})`);

        this.documento.Numero = novoNumero || this.documento.Numero;
        this.documento.DataExpedicao = novaDataExpedicao || this.documento.DataExpedicao;

        console.log('Documento CPF atualizado com sucesso!');
    }

    // Excluir um documento CPF
    excluir(): void {
        const index = this.cliente.Documentos.findIndex(doc => doc.Numero === this.documento.Numero);
        if (index !== -1) {
            this.cliente.Documentos.splice(index, 1);  // Remove o documento da lista
            console.log('Documento CPF excluído com sucesso!');
        } else {
            console.log('Documento não encontrado.');
        }
    }

    // Validar dados do documento RG
    validar(): boolean {
        if (!this.documento.Numero || this.documento.Numero.length === 0) {
            console.log('Número de CPF inválido!');
            return false;
        }
        if (!this.documento.DataExpedicao || isNaN(this.documento.DataExpedicao.getTime())) {
            console.log('Data de expedição inválida!');
            return false;
        }
        console.log('Documento CPF validado com sucesso!');
        return true;
    }

    processar(): void {
        this.menu.mostrar();

        const acao = this.entrada.receberNumero('Escolha a ação desejada:');

        switch (acao) {
            case 1:
                this.criar();
                break;
            case 2:
                this.atualizar();
                break;
            case 3:
                this.excluir();
                break;
            case 4:
                this.validar();
                break;
            case 0:
                console.log('Saindo...');
                break;
            default:
                console.log('Opção inválida');
        }
    }
}
