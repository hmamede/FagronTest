using AutoMapper;
using Fagron.Helder.Application.Interfaces;
using Fagron.Helder.Application.Servicos.Clientes;
using Fagron.Helder.Application.Servicos.Profissoes;
using Helder.Fagron.Infra.IoC.Mapeamento;
using SimpleInjector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helder.Fagron.Infra.IoC.Contexto
{
    public class ApplicationIoC
    {
        public static void Registrar(Container container)
        {
            container.RegisterSingleton(() => container.GetInstance<MapeamentoProvedor>().GetMapper());

            container.Register<IClienteApplicationService, ClienteApplicationService>();
            container.Register<IProfissaoApplicationService, ProfissaoApplicationService>();
        }
    }
}
