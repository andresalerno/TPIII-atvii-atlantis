import Menu from "../interfaces/menu";

export default class MenuCadastroCpf implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Escolha uma opção abaixo para o CPF? `)
        console.log(`----------------------`)
        console.log(`| 1 - Criar`)
        console.log(`| 2 - Atualizar`)
        console.log(`| 3 - Excluir`)
        console.log(`| 4 - Validar`)
        console.log(`| 0 - Sair`)
        console.log(`----------------------`)
    }
}