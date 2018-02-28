using Helder.Fagron.Domain.Interfaces;
using Helder.Fagron.Domain.Models;
using Helder.Fagron.Infra.Repositorio.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Data.Entity;

namespace Helder.Fagron.Infra.Repositorio.Repositorios
{
    public class ClienteRepositorio : RepositorioBase<Cliente, FagronTestContexto>, IClienteRepositorio
    {
        public ClienteRepositorio(FagronTestContexto contexto) : base(contexto)
        {

        }

        public override async Task<List<Cliente>> ListarPor(Expression<Func<Cliente, bool>> expressao)
        {
            var retorno = await DbSet.AsNoTracking().Where(expressao).Include(x=> x.Profissao).ToListAsync();
            return retorno;
        }
    }
}
