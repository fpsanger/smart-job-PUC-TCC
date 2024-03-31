CREATE TABLE [dbo].[Empresa]
(
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [varchar](50) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[Cnpj] [varchar](30) NOT NULL,
	[Senha] [varchar](100) NOT NULL,
	[Telefone] [varchar](30) NULL,
	[Ativo] [bit] DEFAULT(1) NOT NULL,
 CONSTRAINT [PK_Empresa] PRIMARY KEY CLUSTERED ([Id]),
 CONSTRAINT [unique_cnpj] UNIQUE NONCLUSTERED ([Cnpj] ASC)
)

CREATE TABLE [dbo].[Vaga]
(
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [varchar](50) NOT NULL,
	[Descricao] [varchar](100) NOT NULL,
	[Remuneracao] [int] NOT NULL,
	[Endereco] [varchar](100) NOT NULL,
	[Estado] [varchar](100) NOT NULL,
	[Cidade] [varchar](100) NOT NULL,
	[Ativo] [bit] DEFAULT(1) NOT NULL,
	[TipoVaga] [varchar](50) NOT NULL,
	[DataAtualizacao] [date] NOT NULL,
	[DataExpiracao] [date] NULL,
	[IdEmpresa] [int] NOT NULL,
	[Status] [int] DEFAULT(0) NOT NULL,
	[LimiteTrabalhadores] [int] NOT NULL
 CONSTRAINT [PK_Vaga] PRIMARY KEY CLUSTERED ([Id] ASC),
 CONSTRAINT [FK_VagaEmpresa] FOREIGN KEY([IdEmpresa]) REFERENCES [dbo].[Empresa] ([Id]),
 )

 CREATE TABLE [dbo].[Trabalhador]
(
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [varchar](50) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[Cpf] [varchar](30) NOT NULL,
	[Senha] [varchar](100) NOT NULL,
	[Telefone] [varchar](30) NULL,
	[Ativo] [bit] DEFAULT(1) NOT NULL,
 CONSTRAINT [PK_Trabalhador] PRIMARY KEY CLUSTERED ([Id] ASC),
 CONSTRAINT [unique_cpf] UNIQUE NONCLUSTERED ([CPF] ASC)
 )
 
CREATE TABLE [dbo].[TrabalhadorVaga]
(
	[IdVaga] [int] NOT NULL,
	[IdTrabalhador] [int] NOT NULL,
	[DataAceite] [datetime] NOT NULL,
	[Status] [int] DEFAULT(0) NOT NULL,
	CONSTRAINT [PK_TrabalhadorVaga] PRIMARY KEY CLUSTERED ([IdVaga],[IdTrabalhador]),
	CONSTRAINT [FK_Trabalhador] FOREIGN KEY([IdTrabalhador]) REFERENCES [dbo].[Trabalhador] ([Id]),
	CONSTRAINT [FK_Vaga] FOREIGN KEY([IdVaga]) REFERENCES [dbo].[Vaga] ([Id])
)

