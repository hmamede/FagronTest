using AutoMapper;
using AutoMapper.Configuration;
using SimpleInjector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using map = Fagron.Helder.Application.Mapeamento;

namespace Helder.Fagron.Infra.IoC.Mapeamento
{
    public class MapeamentoProvedor
    {
        private readonly Container _container = ContainerFactory.Container;

        /// <summary>
        /// Retorna o Mapper configurado
        /// </summary>
        /// <returns></returns>
        public IMapper GetMapper()
        {
            var mce = new MapperConfigurationExpression();
            mce.ConstructServicesUsing(_container.GetInstance);

            var profiles = typeof(map.Mapeamento).Assembly.GetTypes()
                .Where(t => typeof(Profile).IsAssignableFrom(t))
                .ToList();

            mce.AddProfiles(profiles);

            var mc = new MapperConfiguration(mce);
            mc.AssertConfigurationIsValid();

            IMapper m = new Mapper(mc, t => _container.GetInstance(t));

            return m;
        }
    }
}
