using Helder.Fagron.Infra.IoC.Contexto;
using Helder.Fagron.Infra.IoC.Mapeamento;
using Microsoft.Owin;
using SimpleInjector;
using SimpleInjector.Lifestyles;
using SimpleInjector.Advanced;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using SimpleInjector.Integration.WebApi;

namespace Helder.Fagron.WebApi.App_Start
{
    public static class SimpleInjectorInitializer
    {
        public static Container Initialize()
        {
            var container = ContainerFactory.Container;
            container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();

            // Chamada dos módulos do Simple Injector
            InitializeContainer(container);

            //Registra o Owin...
            RegisterOwin(container);

            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);
            container.Verify();

            GlobalConfiguration.Configuration.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(container);

            return container;
        }

        private static void InitializeContainer(Container container)
        {
            ApplicationIoC.Registrar(container);
            RepositorioIoC.Registrar(container);
        }

        static void RegisterOwin(Container container)
        {
            container.Register(() =>
            {
                IOwinContext owinContext;

                if (HttpContext.Current != null &&
                    HttpContext.Current.Items["owin.Environment"] == null
                    && container.IsVerifying()
                )
                    owinContext = new OwinContext();
                else
                    owinContext = HttpContext.Current.GetOwinContext();

                return owinContext.Authentication;
            });
        }
    }
}