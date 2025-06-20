import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import MenuEditarEnderecoEDocumentos from "../menus/menuEdicaoClienteAdicional";
import Cliente from "../modelos/cliente";
import EditarDocumentosCliente from "./editarDocumentosCliente";
import EditarEnderecoCliente from "./editarEnderecoTitular";

export default class EditarCliente extends Processo {
    processar(): void {
        console.log('Iniciando a edição de um cliente existente...');

        // Exibir a lista de clientes disponíveis para edição
        let armazem = Armazem.InstanciaUnica;
        console.log('Clientes disponíveis para edição:');
        console.table(armazem.Clientes.map((cliente, index) => ({
            'ID': index,  // ID sendo o índice do cliente na lista
            'Nome': cliente.Nome,
            'Nome Social': cliente.NomeSocial,
            'Data de Nascimento': cliente.DataNascimento.toLocaleDateString()
        })));


        // Receber o número do cliente que será editado
        let clienteIndex = this.entrada.receberNumero('Escolha o número do cliente para editar:');

        // Verificar se o índice escolhido é válido
        let cliente = armazem.Clientes[clienteIndex];
        if (!cliente) {
            console.log('Índice inválido. Cliente não encontrado.');
            return;
        }

        console.log(`Cliente selecionado: ${cliente.Nome} (${cliente.NomeSocial})`);

        // Editar os dados do cliente
        let novoNome = this.entrada.receberTexto(`Qual o novo nome do cliente? (atual: ${cliente.Nome})`);
        let novoNomeSocial = this.entrada.receberTexto(`Qual o novo nome social do cliente? (atual: ${cliente.NomeSocial})`);

        // Pedir a nova data de nascimento com tratamento adequado
        let novaDataNascimento: Date | null = null;
        let novaDataStr = this.entrada.receberTexto(`Qual a nova data de nascimento do cliente? (atual: ${cliente.DataNascimento.toLocaleDateString()})`);

        // Verifica se a data foi fornecida
        if (novaDataStr) {
            novaDataNascimento = new Date(novaDataStr); // Tenta converter para uma data

            // Verifica se a data é válida
            if (isNaN(novaDataNascimento.getTime())) {
                console.log("Data inválida. Mantendo a data atual.");
                novaDataNascimento = null;  // Se inválida, mantém a data anterior
            }
        } else {
            novaDataNascimento = cliente.DataNascimento;  // Se não forneceu data, mantém a data anterior
        }

        // Atualiza os dados do cliente
        cliente.Nome = novoNome || cliente.Nome;
        cliente.NomeSocial = novoNomeSocial || cliente.NomeSocial;
        cliente.DataNascimento = novaDataNascimento || cliente.DataNascimento;

        // Agora, exibimos o menu para editar endereço e documentos
        const menuEdicao = new MenuEditarEnderecoEDocumentos();
        menuEdicao.mostrar();  // Mostra o menu de edição

        const opcaoEdicao = this.entrada.receberNumero('Escolha uma opção para editar:');

        switch (opcaoEdicao) {
            case 1:
                // Edição de endereço do cliente
                this.processo = new EditarEnderecoCliente(cliente);  // Reutilizando a classe de edição de endereço
                this.processo.processar();
                break;
            case 2:
                // Edição de documentos do cliente
                this.processo = new EditarDocumentosCliente(cliente);  // Reutilizando a classe de edição de documentos
                this.processo.processar();
                break;
            case 0:
                console.log('Saindo da edição de cliente.');
                break;
            default:
                console.log('Opção não reconhecida!');
        }

        console.log('Cliente editado com sucesso!');
    }
}
