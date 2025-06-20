import Impressor from "../interfaces/impressor";
import Documento from "../modelos/documento";

export default class ImpressorDocumentos implements Impressor {
    private documentos: Documento[];

    constructor(documentos: Documento[]) {
        this.documentos = documentos;
    }

    imprimir(): object[] {
        // Retornando um array de objetos, onde cada objeto representa um documento
        return this.documentos.map(doc => ({
            Tipo: doc.Tipo,
            DataExpedicao: doc.DataExpedicao.toLocaleDateString(),
            Numero: doc.Numero
        }));
    }
}
