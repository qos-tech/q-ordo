# Q-Ordo

![Q-Ordo Project Banner](https://placehold.co/800x300/1e293b/ffffff?text=Q-Ordo&font=raleway)

A modern, open-source platform for client management and billing automation, designed as a powerful alternative for the web hosting industry and digital agencies.

### Navegação

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tech Stack](#-tech-stack)
- [Funcionalidades](#-funcionalidades)
- [Status do Projeto & Roadmap](#-status-do-projeto--roadmap)
- [Como Contribuir](#️-como-contribuir)

---

## 🚀 Sobre o Projeto

**Ordo** (do Latim para "ordem", "organização") é uma plataforma de faturamento moderna e auto-hospedável, construída do zero para fornecer uma solução completa e de código aberto para gestão de clientes, faturamento automatizado e provisionamento de serviços. É feita sob medida para agências, provedores de hospedagem, empresas de SaaS e negócios digitais modernos.

O nosso objetivo é criar uma alternativa robusta, segura e escalável aos softwares de faturamento tradicionais, construída inteiramente sobre uma stack moderna de TypeScript.

## 🛠️ Tech Stack

O Q-Ordo é construído como um monorepo usando **Turborepo** para gerir a API de backend e a aplicação web de frontend.

- **Backend:** [Fastify](https://fastify.io/), [Node.js](https://nodejs.org/)
- **Frontend:** [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Base de Dados:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Validação da API:** [Zod](https://zod.dev/)
- **Documentação da API:** [Swagger (OpenAPI)](https://swagger.io/)

## ✨ Funcionalidades

A nossa arquitetura foi desenhada para ser abrangente e modular, cobrindo todo o ciclo de vida do cliente.

- **Arquitetura Multi-tenant:** Gira múltiplos **Prestadores de Serviço** e as suas respetivas **Empresas** (clientes) numa única instância.
- **Gestão de Clientes:** Um sistema robusto para gerir empresas e os seus vários pontos de contacto.
- **Sistema de Utilizadores e Permissões:** Um sistema de controlo de acesso flexível e baseado em funções (`OWNER`, `ADMIN`, `MEMBER`) que liga os utilizadores às empresas.
- **Autenticação:** Autenticação segura com email/palavra-passe e pronta para Logins Sociais (OAuth).
- **Catálogo de Produtos:** Um catálogo poderoso com um modelo de preços flexível que suporta ciclos de faturação únicos e recorrentes.
- **Gestão de Pedidos:** Um sistema simplificado para os clientes fazerem novos pedidos de produtos e serviços.
- **Faturação Automatizada:** Um sistema de faturas completo, desenhado para a geração automática de faturas recorrentes.
- **E muito mais...** (Tickets de Suporte, Promoções, Afiliados, Base de Conhecimento)

## 🗺️ Status do Projeto & Roadmap

Este projeto está em desenvolvimento ativo. O nosso roteiro está dividido em sprints, mostrando o que já alcançámos e no que estamos a trabalhar agora.

### **Sprint 1: Fundação & Onboarding de Clientes (API)**

_Prazo: 2 de Outubro de 2025_

#### ✅ Concluído

- [x] **Tarefa 1:** Inicializar o Monorepo com Turborepo.
- [x] **Tarefa 2:** Configurar ESLint, Prettier e TypeScript partilhados.
- [x] **Configurações do VS Code:** Padronizar o ambiente de desenvolvimento.
- [x] **Documentação:** Criar o README inicial e configurar o repositório.

#### ⏳ Em Desenvolvimento

- [ ] **Tarefa 3:** Modelagem Inicial da Base de Dados (Prisma).
- [ ] **Tarefa 4:** Configurar o Servidor Fastify na API.
- [ ] **Tarefa 5:** Implementar Autenticação JWT.
- [ ] **Tarefa 6:** Criar o Endpoint de Registo de Cliente (CRUD).
- [ ] **Tarefa 7:** Documentar os Endpoints com Swagger.

### 💡 Sprint 2 (Planeamento)

- [ ] **Gestão de Utilizadores:** API para que os donos das empresas possam convidar e gerir os membros da sua equipa.
- [ ] **Gestão do Catálogo de Produtos:** API CRUD completa para gerir Produtos, Categorias e Preços.
- [ ] **Fundação do Frontend:** Configuração inicial da aplicação Next.js para a área do cliente.

## ❤️ Como Contribuir

O Q-Ordo é um projeto open-source e as contribuições são bem-vindas! Quer seja um programador, designer ou apenas tenha boas ideias, adoraríamos que se envolvesse. Por favor, consulte o nosso ficheiro `CONTRIBUTING.md` para obter diretrizes sobre como começar.
