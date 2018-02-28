using Helder.Fagron.Domain.Interfaces;
using Helder.Fagron.Domain.Models;
using Helder.Fagron.Infra.Repositorio.Contexto;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Helder.Fagron.Infra.Repositorio.Repositorios
{
    public class ProfissaoRepositorio : RepositorioBase<Profissao, FagronTestContexto>, IProfissaoRepositorio
    {
        public ProfissaoRepositorio(FagronTestContexto contexto) : base(contexto)
        {

        }

    }
}
