import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import MenuCadastroRg from "../menus/MenuCadastroRg";

export default class CadastroRg extends Processo {
    private cliente: Cliente;
    private documento: Documento;

    constructor(cliente: Cliente, documento: Documento | null = null) {
        super();
        this.cliente = cliente;
        this.documento = documento || new Documento("", TipoDocumento.RG, new Date());  // Se não houver documento, cria um novo
        this.menu = new MenuCadastroRg();
    }

    // Criar um novo documento RG
    criar(): void {
        console.log('Criando um novo documento RG...');
        const numero = this.entrada.receberTexto('Qual o número do RG?');
        const dataExpedicao = this.entrada.receberData('Qual a data de expedição do RG?');

        this.documento.Numero = numero;
        this.documento.DataExpedicao = dataExpedicao;

        // Adicionando o documento ao cliente
        this.cliente.Documentos.push(this.documento);
        console.log('Documento RG criado com sucesso!');
    }

    // Atualizar um documento RG existente
    atualizar(): void {
        console.log('Atualizando o documento RG...');

        // Atualiza os dados do documento com base no que foi passado
        const novoNumero = this.entrada.receberTexto(`Qual o novo número do RG? (atual: ${this.documento.Numero})`);
        const novaDataExpedicao = this.entrada.receberData(`Qual a nova data de expedição? (atual: ${this.documento.DataExpedicao.toLocaleDateString()})`);

        this.documento.Numero = novoNumero || this.documento.Numero;
        this.documento.DataExpedicao = novaDataExpedicao || this.documento.DataExpedicao;

        console.log('Documento RG atualizado com sucesso!');
    }

    // Excluir um documento RG
    excluir(): void {
        const index = this.cliente.Documentos.findIndex(doc => doc.Numero === this.documento.Numero);
        if (index !== -1) {
            this.cliente.Documentos.splice(index, 1);  // Remove o documento da lista
            console.log('Documento RG excluído com sucesso!');
        } else {
            console.log('Documento não encontrado.');
        }
    }

    // Validar dados do documento RG
    validar(): boolean {
        if (!this.documento.Numero || this.documento.Numero.length === 0) {
            console.log('Número de RG inválido!');
            return false;
        }
        if (!this.documento.DataExpedicao || isNaN(this.documento.DataExpedicao.getTime())) {
            console.log('Data de expedição inválida!');
            return false;
        }
        console.log('Documento RG validado com sucesso!');
        return true;
    }

    processar(): void {
        this.menu.mostrar();

        const acao = this.entrada.receberNumero(`Escolha a ação desejada:`);

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
