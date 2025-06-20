export interface ProcessadorDocumento {
    criar(): void;         // Criar um novo documento
    atualizar(): void;     // Atualizar (editar) um documento existente
    excluir(): void;       // Excluir um documento
    validar(): boolean;    // Validar os dados do documento
}