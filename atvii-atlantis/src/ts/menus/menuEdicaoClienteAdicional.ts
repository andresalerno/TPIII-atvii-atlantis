import Menu from "../interfaces/menu";

export default class MenuEditarEnderecoEDocumentos implements Menu {
    mostrar(): void {
        console.clear();
        console.log(`****************************`);
        console.log(`| O que você gostaria de editar?`);
        console.log(`----------------------`);
        console.log(`| 1 - Editar Endereço`);
        console.log(`| 2 - Editar Documentos`);
        console.log(`| 0 - Sair`);
        console.log(`****************************`);
    }
}
