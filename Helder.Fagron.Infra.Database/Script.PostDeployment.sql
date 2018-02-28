
--**********************************************************************
--	CARGA DE PROFISSÕES
--**********************************************************************

SET NOCOUNT ON

MERGE INTO [dbo].[Profissao] AS Target
USING (VALUES
	  ('Desenvolvedor .Net', 1)
	 ,('Desenvolvedor Delphi', 1)
	 ,('Analista de Qualidade', 1)
	 ,('Analista de UX', 1)
	 ,('Coordenador de Desenvolvimento', 1)
	 ,('Coordenador de Qualidade', 1)
	 ,('Analista de Suporte', 1)
	 ,('Coordenador de Suporte', 1)
	 ,('Arquiteto de Software', 1)
	 ,('Engenheiro de Software', 1)
)
AS Source ([Nome], [Status])

ON (Target.[Nome] = Source.[Nome])

WHEN MATCHED THEN
	UPDATE SET
		  [Nome] = Source.[Nome]
		, [Status] = Source.[Status]

WHEN NOT MATCHED BY TARGET THEN
	INSERT ([Nome], [Status])
	VALUES (Source.[Nome], Source.[Status])

;
GO

DECLARE
	  @mergeError int
	, @mergeCount int

SELECT
	  @mergeError = @@ERROR
	, @mergeCount = @@ROWCOUNT

IF @mergeError != 0
BEGIN
	PRINT 'ERROR OCCURRED IN MERGE FOR [dbo].[Profissao]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100));
END
ELSE
BEGIN
	PRINT '[dbo].[Profissao] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
END
GO

SET NOCOUNT OFF
GO