using Microsoft.Owin;
using Owin;

using Helder.Fagron.WebApi.App_Start;

using SimpleInjector.Extensions.ExecutionContextScoping;

[assembly: OwinStartup(typeof(Helder.Fagron.WebApi.Startup))]

namespace Helder.Fagron.WebApi
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var container = SimpleInjectorInitializer.Initialize();
            app.Use(async (context, next) =>
            {
                using (var scope = container.BeginExecutionContextScope())
                {
                    await next.Invoke();
                }
            });
        }
    }
}
