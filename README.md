Unifae Care
Aplicativo mobile do paciente para acompanhamento de tratamento fisioterápico — plano de exercícios, progresso, perfil e dados clínicos.
Construído com React Native + Expo e TypeScript, seguindo uma arquitetura em camadas inspirada na Clean Architecture.
---
Tecnologias
React Native com Expo (Expo Router para navegação)
TypeScript
expo-secure-store — armazenamento seguro do token (Keychain no iOS, Keystore no Android)
jwt-decode — leitura do token JWT para verificar expiração
---
Arquitetura
O projeto separa responsabilidades em camadas, onde as dependências sempre apontam "para dentro" (a interface depende da lógica, a lógica não depende da interface). Isso mantém o código testável e fácil de alterar: trocar a API, o armazenamento ou a tela afeta apenas a camada correspondente.
```
app/                      → Telas e rotas (Expo Router)
└── (auth), (tabs), etc.

src/
├── domain/               → O núcleo: descrições puras, sem detalhes técnicos
│   ├── entities/         → Formato dos dados (Home, ProfileData...)
│   └── repositories/     → Contratos/interfaces (IAuthRepository...)
│
├── application/          → Casos de uso: as ações do app
│   └── usecases/         → LoginUseCase, GetHomeUseCase...
│
├── data/                 → Implementações que falam com o mundo externo
│   ├── datasources/      → Acesso à API (Remote) e ao disco (Local)
│   └── repositories/     → Orquestram os datasources
│
├── presentation/         → Ponte com a UI
│   └── hooks/            → Estado e lógica para as telas (useLogin, useHome...)
│
└── core/                 → Compartilhado por todo o app
    ├── config/           → Configuração de ambiente e injeção de dependência
    └── errors/           → Erros tipados (NetworkError, UnauthorizedError...)
```
Fluxo de uma requisição
Da interface até a API, cada camada conversa apenas com a vizinha:
```
Tela  →  Hook  →  Use Case  →  Repositório  →  Data Source  →  API
```
Exemplo (carregar a home): a tela usa `useHome`, que chama `GetHomeUseCase`, que pede ao `HomeRepository`, que pega o token (via repositório de auth) e chama o `HomeRemoteDataSource`, que faz a requisição autenticada à API.
Princípios aplicados
Injeção de dependência — as peças são montadas em `core/config/container.ts` e injetadas via construtor, em vez de cada peça criar suas dependências.
Programação para interfaces — os casos de uso dependem de interfaces (ex: `IAuthRepository`), não de classes concretas, permitindo trocar implementações sem alterar a lógica.
Responsabilidade única — cada datasource cuida de uma única fonte (API ou disco); cada caso de uso, de uma única ação.
---
Funcionalidades
Implementadas
Login — autenticação via API, token JWT salvo em armazenamento seguro.
Verificação de sessão — ao abrir o app, valida o token (existência e expiração) e direciona para login ou home.
Home — exibe resumo do dia: progresso do plano, próximo exercício e mensagem motivacional.
Perfil — dados do paciente e da coordenadora responsável.
Logout — encerra a sessão e limpa o token.
Pendências conhecidas
Softblock ao expirar token: quando o token expira durante o uso, a tela exibe "Sessão expirada" mas não redireciona automaticamente para o login. Solução planejada: tratamento centralizado de erro de sessão (401) que force o redirecionamento.
Exercícios: a tela de lista de exercícios (`/app/home/plan/exercises`) ainda não foi integrada.
Dependentes da API (a alinhar)
Algumas telas foram desenhadas com campos que a API atual não fornece:
Nome do paciente na home (a tela saúda o usuário, mas a rota `/app/home` não retorna o nome).
Fisioterapeuta responsável no perfil (a API fornece apenas a coordenadora).
Registro e recuperação de senha (telas existem, mas não há rotas correspondentes na API).
---
Como rodar
Pré-requisitos: Node.js e Expo instalados.
```bash
# Instalar as dependências
npm install

# Iniciar o projeto (com cache limpo)
npx expo start -c
```
Abra no emulador Android/iOS ou no app Expo Go pelo QR Code.
---
Estrutura de uma nova feature
Para adicionar uma feature que consome a API, a ordem de criação dos arquivos é:
Entidade (`domain/entities/`) — o formato do dado retornado.
Interface do repositório (`domain/repositories/`) — o contrato.
Data source (`data/datasources/`) — a requisição à API.
Repositório (`data/repositories/`) — orquestra o datasource (e o token, se autenticado).
Caso de uso (`application/usecases/`) — a ação.
Registro no container (`core/config/container.ts`) — monta e expõe a cadeia.
Hook (`presentation/hooks/`) — estado para a tela.
Tela (`app/`) — consome o hook e exibe os dados.
