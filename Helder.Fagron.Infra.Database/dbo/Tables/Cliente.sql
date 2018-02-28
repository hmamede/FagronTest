CREATE TABLE [dbo].[Cliente] (
    [Id]             INT          IDENTITY (1, 1) NOT NULL,
    [Nome]           VARCHAR (20) NOT NULL,
    [Sobrenome]      VARCHAR (30) NOT NULL,
    [DataNascimento] DATE         NOT NULL,
    [ProfissaoId]    INT          NULL,
    [DataCriacao]    DATETIME     DEFAULT (getdate()) NOT NULL,
    [DataAlteracao]  DATETIME     NULL,
    [Status]         BIT          DEFAULT ((1)) NOT NULL,
    [Excluido]       BIT          DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK__Cliente] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Cliente_Profissao] FOREIGN KEY ([ProfissaoId]) REFERENCES [dbo].[Profissao] ([Id])
);

