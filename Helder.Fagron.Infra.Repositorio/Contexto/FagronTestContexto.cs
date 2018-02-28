using Helder.Fagron.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Helder.Fagron.Infra.Repositorio.Contexto
{
    public class FagronTestContexto : DbContext
    {
        public FagronTestContexto() : base("Default")
        {
        }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Profissao> Profissoes { get; set; }

        public override int SaveChanges()
        {
            ConfigProperties.SaveDefaultPropertiesChanges(ChangeTracker);
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken)
        {
            ConfigProperties.SaveDefaultPropertiesChanges(ChangeTracker);
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
