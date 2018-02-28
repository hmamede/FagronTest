using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fagron.Helder.Application.Interfaces
{
    public interface IApplicationServiceBase<TViewModel, TInput>
        where TViewModel : class
    {
        Task<TViewModel> Obter(int id);

        Task<TViewModel> Adicionar(TInput input);

        Task<TViewModel> Atualizar(int id, TInput input);

        Task Excluir(int id);

        Task<List<TViewModel>> Listar();

    }
}
