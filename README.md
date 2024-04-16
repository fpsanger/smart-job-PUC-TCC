# Smart Jobs - Uma nova maneira de renda extra

## Descrição
O projeto tem como objetivo proporcionar uma plataforma para encontrar as melhores vagas disponibilizadas por empresas. O desenvolvimento backend foi realizado utilizando JavaScript e Express.js, um framework para construir aplicações web com RESTful APIs.

O script com a criação das tabelas está na pasta: script-banco-de-dados

## Tecnologias utilizadas
- Backend:
  - Linguagem: JavaScript
  - Framework: Express.js
  - Banco de dados: SQL Server
 
- Frontend:
  - Linguagem: TypeScript
  - Framework: Angular (HTML,CSS)
  - Biblioteca componenete: PrimeNG
 
- Testes:
  - Jasmine: Angular

## Arquitetura
A arquitetura escolhida para o projeto foi a monolítica, dada a simplicidade das funcionalidades e a natureza da prova de conceito. Isso foi decidido devido à necessidade de um menor tempo de configuração e manutenção. A conexão do backend com o frontend será feita através do Express.js, possibilitando operações básicas no banco de dados.

## Testes
Para garantir a qualidade do código desenvolvido, será utilizado o Jasmine do Angular aproveitando a familiaridade com JavaScript e TypeScript.

## Referências
A imagem utilizada na tela inicial do projeto foi gerada com ajuda do site Canva. Fonte: Canva, https://www.canva.com/ai-image-generator/

## Como testar
Primeiro, é preciso criar um perfil como Empresa, preenchendo todos os dados no cadastro. Após o cadastro, você será redirecionado para a tela principal. Nela, cliclar no botão 'Adicionar nova vaga' e preencher o formulário. Após o preenchimento, será possível ver a vaga como usuário Empresa e Trabalhador. Para ver como Trabalhador, basta sair, criar uma conta de Trabalhador e fazer login. 
