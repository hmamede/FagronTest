using Helder.Fagron.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Helder.Fagron.Domain.Interfaces
{
    public interface IRepositorioBase<T> where T : EntidadeBase
    {
        Task Excluir(T entidade);
        Task Inserir(T entidade);
        Task Atualizar(T entidade);
        Task<T> ObterPorId(int id);
        Task<List<T>> ListarPor(Expression<Func<T, bool>> expressao);

        //Task<ResultadoPaginacao<TEntity>> GetAll(Paginacao paginationInput);
        //Task<List<TEntity>> GetAllBy(Expression<Func<TEntity, bool>> predicate);
        //Task<ResultadoPaginacao<TEntity>> GetAllBy(Expression<Func<TEntity, bool>> predicate, Paginacao paginationInput);
    }
}
