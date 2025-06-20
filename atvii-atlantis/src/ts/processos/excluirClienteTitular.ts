import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class ExcluirCliente extends Processo {
    processar(): void {
        console.log('Iniciando a exclusão de um cliente existente...')

        // Exibir a lista de clientes disponíveis para exclusão
        let armazem = Armazem.InstanciaUnica;
        console.log('Clientes disponíveis para exclusão:');

        // Exibir a lista de clientes de forma tabular para melhor visualização
        console.table(armazem.Clientes.map((cliente, index) => ({
            'ID': index,  // ID sendo o índice do cliente na lista
            'Nome': cliente.Nome,
            'Nome Social': cliente.NomeSocial,
            'Data de Nascimento': cliente.DataNascimento.toLocaleDateString()
        })));

        // Receber o número do cliente que será excluído
        let clienteIndex = this.entrada.receberNumero('Escolha o número do cliente para excluir:');
        
        // Verificar se o índice escolhido é válido
        let cliente = armazem.Clientes[clienteIndex];
        if (!cliente) {
            console.log('Índice inválido. Cliente não encontrado.');
            return;
        }

        // Confirmar a exclusão do cliente
        let confirmacao = this.entrada.receberTexto(`Você tem certeza que deseja excluir o cliente ${cliente.Nome}? (S/N)`).toLowerCase();
        if (confirmacao === 's' || confirmacao === 'sim') {
            // Remover documentos do cliente
            if (cliente.Documentos.length > 0) {
                console.log(`Excluindo documentos do cliente ${cliente.Nome}...`);
                cliente.Documentos.length = 0; // Limpar a lista de documentos
            }

            // Remover endereço do cliente
            if (cliente.Endereco) {
                console.log(`Excluindo endereço do cliente ${cliente.Nome}...`);
                cliente.Endereco = null; // Limpar o endereço
            }

            // Excluindo o cliente da lista
            armazem.Clientes.splice(clienteIndex, 1); // Remove o cliente pelo índice

            console.log('Cliente excluído com sucesso!');
        } else {
            console.log('Exclusão cancelada.');
        }
    }
}