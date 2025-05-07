import Menu from "../interfaces/menu";

export default class MenuPrincipal implements Menu {
    mostrar(): void {
        console.log(`****************************`)
        console.log(`| Por favor, selecione uma opção...`)
        console.log(`----------------------`)
        console.log(`| Opções para edição de dados cadastrais:`)
        console.log(`----------------------`)
        console.log(`| 1 - Nome cliente`)
        console.log(`| 2 - Nome social cliente`)
        console.log(`| 3 - Data nascimento cliente`)
        console.log(`****************************`)
        console.log(`| 0 - Sair`)
        console.log(`----------------------`)
    }
}