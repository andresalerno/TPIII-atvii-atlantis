export default interface Impressor {
    imprimir(): object | object[] | null | void; // Alterado para permitir retorno de void
}