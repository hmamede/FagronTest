using SimpleInjector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helder.Fagron.Infra.IoC.Mapeamento
{
    public static class ContainerFactory
    {
        private static Container _container;

        public static Container Container
        {
            get
            {
                return ContainerFactory.GetContainerInstance();
            }
        }

        private static Container GetContainerInstance()
        {
            if (ContainerFactory._container == null)
            {
                ContainerFactory._container = new Container();
            }
            return ContainerFactory._container;
        }
    }
}
