Ordo

<p align="center">
<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDYwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImxvZ29HcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM0RjQ2RTU7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzA4OTFCMjtzdG9wLW9wYWNpdHk6MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8c3R5bGU+CiAgICAgICAgQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UmFsZXdheTp3Z2h0QDcwMCZkaXNwbGF5PXN3YXAnKTsKICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxZTI5M2IiIC8+CiAgCiAgPCEtLSBBc3NpbWJvbCBhYnN0cmF0byBkZSBPIC0tPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1MCAxNTApIj4KICAgIDxwYXRoIGQ9Ik0gNjAgMCBBIDYwIDYwIDAgMCAxIC0zMCA1MS45NiBMIC0xNSAyNS45OCBBIDMwIDMwIDAgMCAwIDMwIDAgWiIgZmlsbD0idXJsKCNsb2dvR3JhZGllbnQpIi8+CiAgICA8cGF0aCBkPSJNIC0zMCA1MS45NiBBIDYwIDYwIDAgMCAxIC0zMCAtNTEuOTYgTCAtMTUgLTI1Ljk4IEEgMzAgMzAgMCAwIDAgLTE1IDI1Ljk4IFoiIGZpbGw9InVybCgjbG9nb0dyYWRpZW50KSIgb3BhY2l0eT0iMC44Ii8+CiAgICA8cGF0aCBkPSJNIC0zMCAtNTEuOTYgQSA2MCA2MCAwIDAgMSA2MCAwIEwgMzAgMCBBIDMwIDMwIDAgMCAwIC0xNSAtMjUuOTggWiIgZmlsbD0idXJsKCNsb2dvR3JhZGllbnQpIiBvcGFjaXR5PSIwLjYiLz4KICA8L2c+CiAgCiAgPCEtLSBUZXh0byAtLT4KICA8dGV4dCB4PSIzMDAiIHk9IjE2NSIgZm9udC1mYW1pbHk9IlJhbGV3YXksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iODAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ic3RhcnQiPgogICAgT3JkbwogIDwvdGV4dD4KPC9zdmc+" alt="Ordo Project Banner">
</p>

<p align="center">
<strong>A modern, open-source platform for client management and billing automation, designed as a powerful alternative for the web hosting industry and digital agencies.</strong>
</p>

<p align="center">
<a href="#-about-the-project">About</a> •
<a href="#-tech-stack">Tech Stack</a> •
<a href="#-features">Features</a> •
<a href="#-project-status--roadmap">Roadmap</a> •
<a href="#-contributing">Contributing</a>
</p>

🚀 About the Project
Ordo (from the Latin for "order", "organization") is a modern, self-hostable billing platform built from the ground up to provide a complete, open-source solution for client management, automated invoicing, and service provisioning. It's tailored for agencies, hosting providers, SaaS companies, and modern digital businesses.

Our goal is to create a robust, type-safe, and scalable alternative to traditional billing software, built entirely on a modern TypeScript stack.

🛠️ Tech Stack
Ordo is built as a monorepo using Turborepo to manage the backend API and the frontend web application.

Backend: Fastify, Node.js

Frontend: Next.js, React, Tailwind CSS

Database: PostgreSQL

ORM: Prisma

Language: TypeScript

API Validation: Zod

API Documentation: Swagger (OpenAPI)

✨ Features
Our architecture is designed to be comprehensive and modular, covering the entire client lifecycle.

Multi-tenant Architecture: Manage multiple Service Providers and their respective Companies (clients) within a single instance.

Client Management: A robust system for managing companies and their various points of contact.

User & Permission System: A flexible, role-based access control system (OWNER, ADMIN, MEMBER) linking users to companies.

Authentication: Secure authentication with email/password and ready for Social Logins (OAuth).

Product Catalog: A powerful catalog with a flexible pricing model supporting one-time and recurring billing.

Order Management: A streamlined system for clients to place new orders.

Automated Billing: A complete invoicing system designed for automated generation of recurring invoices.

And much more... (Support Tickets, Promotions, Affiliates, Knowledgebase)

🗺️ Project Status & Roadmap
This project is under active development. Our roadmap is divided into sprints, showing what we've accomplished and what we're working on now.

Sprint 1: Foundation & Client Onboarding (API)
Prazo: 2 de Outubro de 2025

✅ Concluído
[x] Tarefa 1: Inicializar o Monorepo com Turborepo.

[x] Tarefa 2: Configurar ESLint, Prettier e TypeScript partilhados.

[x] Configurações do VS Code: Padronizar o ambiente de desenvolvimento.

⏳ Em Desenvolvimento
[ ] Tarefa 3: Modelagem Inicial do Banco de Dados (Prisma).

[ ] Tarefa 4: Configurar Servidor Fastify na API.

[ ] Tarefa 5: Implementar Autenticação JWT.

[ ] Tarefa 6: Criar Endpoint de Cadastro de Cliente (CRUD).

[ ] Tarefa 7: Documentar Endpoints com Swagger.

💡 Sprint 2 (Planeamento)
[ ] Gestão de Utilizadores: API para que os donos das empresas possam convidar e gerir os membros da sua equipa.

[ ] Gestão do Catálogo de Produtos: API CRUD completa para gerir Produtos, Categorias e Preços.

[ ] Frontend Foundation: Configuração inicial da aplicação Next.js para a área do cliente.

❤️ Contributing
Ordo is an open-source project, and contributions are welcome! Whether you're a developer, designer, or just have great ideas, we'd love for you to get involved. Please check
