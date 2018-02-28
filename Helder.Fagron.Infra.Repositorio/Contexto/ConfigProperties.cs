using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helder.Fagron.Infra.Repositorio.Contexto
{
    public static class ConfigProperties
    {
        public static void SaveDefaultPropertiesChanges(DbChangeTracker changeTracker)
        {
            foreach (var entry in changeTracker.Entries()
                         .Where(e => e.State == EntityState.Added))
            {
                var exists = entry.Entity.GetType().GetProperty("DataCriacao");

                if (exists != null)
                {
                    entry.Property("DataCriacao").CurrentValue = DateTime.Now;
                }
            }

            foreach (var entry in changeTracker.Entries()
                        .Where(e => e.State == EntityState.Modified))
            {
                var exists = entry.Entity.GetType().GetProperty("DataAlteracao");

                if (exists != null)
                    entry.Property("DataAlteracao").CurrentValue = DateTime.Now;
            }
        }
    }
}
