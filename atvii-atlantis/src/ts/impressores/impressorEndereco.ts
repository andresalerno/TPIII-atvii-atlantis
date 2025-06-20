import Impressor from "../interfaces/impressor";
import Endereco from "../modelos/endereco";

export default class ImpressorEndereco implements Impressor {
    private endereco: Endereco;

    constructor(endereco: Endereco) {
        this.endereco = endereco;
    }

    imprimir(): object {
        // Retornando os dados do endereço como um objeto
        return {
            Rua: this.endereco.Rua,
            Bairro: this.endereco.Bairro,
            Cidade: this.endereco.Cidade,
            Estado: this.endereco.Estado,
            Pais: this.endereco.Pais,
            CodigoPostal: this.endereco.CodigoPostal
        };
    }
}
