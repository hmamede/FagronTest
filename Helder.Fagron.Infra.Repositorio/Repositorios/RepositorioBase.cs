using Helder.Fagron.Domain.Interfaces;
using Helder.Fagron.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;

namespace Helder.Fagron.Infra.Repositorio.Repositorios
{
    public abstract class RepositorioBase<TEntidadeBase, TContexto> : IRepositorioBase<TEntidadeBase>, IDisposable
        where TEntidadeBase : EntidadeBase
        where TContexto : DbContext
    {
        protected TContexto Db;
        protected DbSet<TEntidadeBase> DbSet;

        public RepositorioBase(TContexto contexto)
        {
            this.Db = contexto;
            this.DbSet = this.Db.Set<TEntidadeBase>();
        }

        public virtual async Task Atualizar(TEntidadeBase entidade)
        {
            this.Db.Entry<TEntidadeBase>(entidade).State = EntityState.Modified;
            await this.Db.SaveChangesAsync();
        }
        public virtual async Task Excluir(TEntidadeBase entidade)
        {
            this.Db.Entry<TEntidadeBase>(entidade).State = EntityState.Modified;
            entidade.Delete();
            await this.Db.SaveChangesAsync();
        }
        public virtual async Task Inserir(TEntidadeBase entidade)
        {
            DbSet.Add(entidade);
            await Db.SaveChangesAsync();
        }
        public virtual async Task<List<TEntidadeBase>> ListarPor(Expression<Func<TEntidadeBase, bool>> expressao)
        {
            var retorno = await this.DbSet.Where<TEntidadeBase>(expressao).ToListAsync<TEntidadeBase>();
            return retorno;
        }
        public virtual async Task<TEntidadeBase> ObterPorId(int id)
        {
            var retorno = await this.DbSet.FirstOrDefaultAsync<TEntidadeBase>((TEntidadeBase c) => c.Id == id);
            return retorno;
        }

        public void Dispose()
        {
            this.Db.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
