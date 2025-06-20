import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";

export default class EditarEnderecoCliente extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        console.log('Iniciando a edição de endereço do cliente...');

        // Exibir o endereço atual do cliente, se houver
        const endereco = this.cliente.Endereco;
        if (endereco) {
            console.log('Endereço atual:');
            console.table([{
                'Rua': endereco.Rua,
                'Bairro': endereco.Bairro,
                'Cidade': endereco.Cidade,
                'Estado': endereco.Estado,
                'País': endereco.Pais,
                'Código Postal': endereco.CodigoPostal
            }]);
        } else {
            console.log('Este cliente ainda não tem um endereço cadastrado.');
        }

        // Solicitar as novas informações para o endereço
        let novaRua = this.entrada.receberTexto(`Qual a nova rua? (atual: ${endereco ? endereco.Rua : 'não definido'})`);
        let novoBairro = this.entrada.receberTexto(`Qual o novo bairro? (atual: ${endereco ? endereco.Bairro : 'não definido'})`);
        let novaCidade = this.entrada.receberTexto(`Qual a nova cidade? (atual: ${endereco ? endereco.Cidade : 'não definido'})`);
        let novoEstado = this.entrada.receberTexto(`Qual o novo estado? (atual: ${endereco ? endereco.Estado : 'não definido'})`);
        let novoPais = this.entrada.receberTexto(`Qual o novo país? (atual: ${endereco ? endereco.Pais : 'não definido'})`);
        let novoCodigoPostal = this.entrada.receberTexto(`Qual o novo código postal? (atual: ${endereco ? endereco.CodigoPostal : 'não definido'})`);

        // Atualizando o endereço
        if (endereco) {
            endereco.Rua = novaRua || endereco.Rua;
            endereco.Bairro = novoBairro || endereco.Bairro;
            endereco.Cidade = novaCidade || endereco.Cidade;
            endereco.Estado = novoEstado || endereco.Estado;
            endereco.Pais = novoPais || endereco.Pais;
            endereco.CodigoPostal = novoCodigoPostal || endereco.CodigoPostal;
        } else {
            // Se não existir um endereço, cria um novo
            const novoEndereco = new Endereco(novaRua, novoBairro, novaCidade, novoEstado, novoPais, novoCodigoPostal);
            this.cliente.Endereco = novoEndereco;
        }

        console.log('Endereço do cliente atualizado com sucesso!');
    }
}
