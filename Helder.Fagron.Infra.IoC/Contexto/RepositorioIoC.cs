using Helder.Fagron.Domain.Interfaces;
using Helder.Fagron.Infra.Repositorio.Contexto;
using Helder.Fagron.Infra.Repositorio.Repositorios;
using SimpleInjector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helder.Fagron.Infra.IoC.Contexto
{
    public class RepositorioIoC
    {
        public static void Registrar(Container container)
        {
            container.Register<IClienteRepositorio, ClienteRepositorio>(Lifestyle.Scoped);
            container.Register<IProfissaoRepositorio, ProfissaoRepositorio>(Lifestyle.Scoped);

            container.Register<FagronTestContexto>(Lifestyle.Scoped);
        }
    }
}
