## Atividade II

Empresa criada: Ocean Solutions

Fundador, Dev e Engenheiro de Software: André Salerno

- Sistema: Atlantis
- Fase: sistema incompleto (CLI) - sem SGBD
- Perfil: generalista
- Padrões usados: Singleton e Strategy
- Objetivo: implementar as funcionalidades obrigatórios e ainda não implementadas
    - CRUD de cliente, incluindo clientes dependentes

## Objetivo

- Sistema CLI
- Não há comunicação com SGBD (dados executados em memória através da classe Armazem)
- Padrões usados: Singleton e Strategy
- Funcionalidades que devem ser implementadas:
    - CRUD de cliente, incluindo clientes dependentes
    - Listagem de clientes dependentes para um titular específico
    - Listagem do titular para o cliente dependente específico

## Diagrama de classe - Padrão Strategy (usado)

<img src="./img/diagrama.png" alt="Diagrama" width="500"/>

## Diagrama de classe Esperado

<img src="./img/diagrama1.png" alt="Diagrama" width="500"/>

O principal padrão de projeto mostrado no diagrama é o Padrão Strategy. Ele é identificado pela estrutura de uma classe abstrata (no caso, a classe Processo) que define uma interface comum para diversas implementações concretas (como CadastroClienteTitular, CadastroDocumentosCliente, CadastroEnderecoTitular, etc.). Cada uma dessas classes concretas representa uma estratégia específica de processamento, permitindo que o comportamento do sistema seja alterado em tempo de execução, conforme a necessidade.

O Padrão Strategy é usado para permitir a troca de algoritmos ou comportamentos dentro de uma classe sem modificar o código que os utiliza.

## Singleton

Esse padrão de projeto tem por objetivo garantir que uma classe tenha somente uma instância e fornecer um ponto global de acesso a ela.

- Instância única: a variável instanciaUnica é declarada como static, o que significa que é uma propriedade da classe, não de instâncias individuais da classe. Isso garante que a classe tenha apenas uma instância compartilhada em todo o código

- Método privado: o método obterInstancia() é privado, o que impede a criação de novas instâncias da classe fora dela.Isso assegura que o controle da instância seja feito de forma centralizada dentro da propria classe.

- Lazy Initialization (Inicialização sob demanda): o padrão Singleton aqui utiliza o conceito de "lazy initialization", onde a instância da classe só é criada quando necessário (ou seja, na primeira vez que obterInstancia() for chamado). Isso evita a criação de objetos desnecessários.

```ts
class Classe {
    private static instanciaUnica: Classe;
    // Constructor privado para evitar a criação de instâncias fora da classe
    private constructor() {}
    private static obterInstancia(): Classe {
        if (!Classe.instanciaUnica) {
            this.instanciaUnica = new Classe();
    }
    return this.instanciaUnica;
}
```

## Rodar projeto

```powershell
git clone https://github.com/andresalerno/TPIII-atvii-atlantis.git
```

```powershell
# rodar esse comando onde está o arquivo package.json
npm install
```

```powershell
# atvii-atlantis folder
npm run dev
```

# Outputs do sistema

```powershell
# cadastro de um titular
****************************
| Por favor, selecione uma opção...
----------------------
| Opções para cliente:
----------------------
| 1 - Cadastrar cliente
| 2 - Editar cliente
| 3 - Listar cliente(s)
| 4 - Excluir cliente
****************************
| 0 - Sair
----------------------
Qual opção desejada? 1

****************************
| Qual o tipo do cliente para cadastro?
----------------------
| 1 - Titular
| 2 - Dependente
| 0 - Voltar
----------------------
Qual opção desejada? 1
Iniciando o cadastro de um novo cliente titular...
Qual o nome do novo cliente titular? Jose Alves
Qual o nome social do novo cliente titular? Jose Alves
Qual a data de nascimento?, no padrão dd/MM/yyyy: 17/10/1987
Coletando os dados de endereço...
Qual a rua? Rua Joaquim Flores, 2
Qual o bairro? Centro
Qual a cidade? Sao Jose dos Campos
Qual o estado? Sao Paulo
Qual o país? Brasil
Qual o código postal? 12242000

# na sequência, aparace um menu para cadastrar os documentos. Pode-se cadastrar as 3 opções
****************************
| Qual o tipo do documento para cadastro/edição/exclusão?
----------------------
| 1 - Cadastro de Pessoas Física
| 2 - Registro Geral
| 3 - Passaporte
| 0 - Finalizar cadastro de documentos
----------------------
Qual opção desejada? 1

****************************
| Escolha uma opção abaixo para o CPF?
----------------------
| 1 - Criar
| 2 - Atualizar
| 3 - Excluir
| 4 - Validar
| 0 - Sair
----------------------
Escolha a ação desejada: 1

Criando um novo documento CPF...
Qual o número do CPF? 14567867890
Qual a data de expedição do CPF?, no padrão dd/MM/yyyy: 01/01/2001

# retorno para o menu de documentos
****************************
| Qual o tipo do documento para cadastro/edição/exclusão?
----------------------
| 1 - Cadastro de Pessoas Física
| 2 - Registro Geral
| 3 - Passaporte
| 0 - Finalizar cadastro de documentos
----------------------
Qual opção desejada? 0

# volto para o menu inicial

****************************
| Por favor, selecione uma opção...
----------------------
| Opções para cliente:
----------------------
| 1 - Cadastrar cliente
| 2 - Editar cliente
| 3 - Listar cliente(s)
| 4 - Excluir cliente
****************************
| 0 - Sair
----------------------
Qual opção desejada? 2

# vamos editar o cliente cadastrado

Qual opção desejada? 2
Iniciando a edição de um cliente existente...
Clientes disponíveis para edição:
┌─────────┬────┬─────────────────┬─────────────────┬────────────────────┐
│ (index) │ ID │ Nome            │ Nome Social     │ Data de Nascimento │
├─────────┼────┼─────────────────┼─────────────────┼────────────────────┤
│ 0       │ 0  │ 'Andre Salerno' │ 'Andre Salerno' │ '22/01/1973'       │
│ 1       │ 1  │ 'Jose Silva'    │ 'Jose Silva'    │ '01/01/1980'       │
│ 2       │ 2  │ 'Jose Alves'    │ 'Jose Alves'    │ '17/10/1987'       │
└─────────┴────┴─────────────────┴─────────────────┴────────────────────┘
Escolha o número do cliente para editar: 2

# se enter os dados são mantidos
Cliente selecionado: Jose Alves (Jose Alves)
Qual o novo nome do cliente? (atual: Jose Alves) Jose Alfredo
Qual o novo nome social do cliente? (atual: Jose Alves) Jose Alfredo
Qual a nova data de nascimento do cliente? (atual: 17/10/1987) 18/10/1987

# acesso o menu de edição (documentos ou endereço)

****************************
| O que você gostaria de editar?
----------------------
| 1 - Editar Endereço
| 2 - Editar Documentos
| 0 - Sair
****************************
Escolha uma opção para editar: 1

Escolha uma opção para editar: 1
Iniciando a edição de endereço do cliente...
Endereço atual:
┌─────────┬─────────────────────────┬──────────┬───────────────────────┬─────────────┬──────────┬───────────────┐
│ (index) │ Rua                     │ Bairro   │ Cidade                │ Estado      │ País     │ Código Postal │
├─────────┼─────────────────────────┼──────────┼───────────────────────┼─────────────┼──────────┼───────────────┤
│ 0       │ 'Rua Joaquim Flores, 2' │ 'Centro' │ 'Sao Jose dos Campos' │ 'Sao Paulo' │ 'Brasil' │ '12242000'    │
└─────────┴─────────────────────────┴──────────┴───────────────────────┴─────────────┴──────────┴───────────────┘

Qual a nova rua? (atual: Rua Joaquim Flores, 2) Rua Joaquim Flores, 3
Qual o novo bairro? (atual: Centro) Centro
Qual a nova cidade? (atual: Sao Jose dos Campos) Piracicaba
Qual o novo estado? (atual: Sao Paulo) Sao Paulo
Qual o novo país? (atual: Brasil) Brasil
Qual o novo código postal? (atual: 12242000) 123456789

# vamos checar a mudança

****************************
| Por favor, selecione uma opção...
----------------------
| Opções para cliente:
----------------------
| 1 - Cadastrar cliente
| 2 - Editar cliente
| 3 - Listar cliente(s)
| 4 - Excluir cliente
****************************
| 0 - Sair
----------------------
Qual opção desejada? 3

****************************
| Qual o tipo de listagem desejada?
----------------------
| 1 - Todos os titulares
| 2 - Todos os dependentes de um titular específico
| 0 - Voltar
----------------------
Qual a opção desejada? 1

****************************
Nome: Jose Alves
Nome Social: Jose Alves
Data de Nascimento: 17/10/1987
Endereço: Rua Joaquim Flores, 3
Documentos:
Cadastro de Pessoas Física: 14567867890
****************************

# excluir cliente

****************************
| Por favor, selecione uma opção...
----------------------
| Opções para cliente:
----------------------
| 1 - Cadastrar cliente
| 2 - Editar cliente
| 3 - Listar cliente(s)
| 4 - Excluir cliente
****************************
| 0 - Sair
----------------------
Qual opção desejada? 4
Iniciando a exclusão de um cliente existente...
Clientes disponíveis para exclusão:
┌─────────┬────┬─────────────────┬─────────────────┬────────────────────┐
│ (index) │ ID │ Nome            │ Nome Social     │ Data de Nascimento │
├─────────┼────┼─────────────────┼─────────────────┼────────────────────┤
│ 0       │ 0  │ 'Andre Salerno' │ 'Andre Salerno' │ '22/01/1973'       │
│ 1       │ 1  │ 'Jose Silva'    │ 'Jose Silva'    │ '01/01/1980'       │
│ 2       │ 2  │ 'Jose Alves'    │ 'Jose Alves'    │ '17/10/1987'       │
└─────────┴────┴─────────────────┴─────────────────┴────────────────────┘
Escolha o número do cliente para excluir: 2
Você tem certeza que deseja excluir o cliente Jose Alves? (S/N) S
Excluindo documentos do cliente Jose Alves...
Excluindo endereço do cliente Jose Alves...
Cliente excluído com sucesso!
****************************

# vamos checar se foi excluído

****************************
| Por favor, selecione uma opção...
----------------------
| Opções para cliente:
----------------------
| 1 - Cadastrar cliente
| 2 - Editar cliente
| 3 - Listar cliente(s)
| 4 - Excluir cliente
****************************
| 0 - Sair
----------------------
Qual opção desejada? 3

****************************
| Qual o tipo de listagem desejada?
----------------------
| 1 - Todos os titulares
| 2 - Todos os dependentes de um titular específico
| 0 - Voltar
----------------------
Qual a opção desejada? 1
****************************
Listando Titulares...
Nome: Andre Salerno
Nome Social: Andre Salerno
Data de Nascimento: 22/01/1973
Endereço: Rua Pau Brasil, 140
Documentos:
Nenhum documento
****************************
Nome: Jose Silva
Nome Social: Jose Silva
Data de Nascimento: 01/01/1980
Endereço: Rua Jose Fonseca, 145
Documentos:
Nenhum documento
****************************

#perceba que o Jose Alves foi excluído

```
    - Listagem de clientes dependentes para um titular específico
    - Listagem do titular para o cliente dependente específico 






