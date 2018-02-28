CREATE TABLE [dbo].[Profissao] (
    [Id]            INT          IDENTITY (1, 1) NOT NULL,
    [Nome]          VARCHAR (50) NOT NULL,
    [DataCriacao]   DATETIME     DEFAULT (getdate()) NOT NULL,
    [DataAlteracao] DATETIME     NULL,
    [Status]        BIT          DEFAULT ((1)) NOT NULL,
    [Excluido]      BIT          DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK__Profissao] PRIMARY KEY CLUSTERED ([Id] ASC)
);

