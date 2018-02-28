using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helder.Fagron.Domain.Models
{
    public abstract class EntidadeBase
    {
        public int Id { get; set; }
        public DateTime? DataCriacao { get; set; }
        public DateTime? DataAlteracao { get; set; }
        public bool Status { get; set; }
        public bool Excluido { get; set; }

        protected EntidadeBase()
        {

        }

        public EntidadeBase(int id, DateTime? dataCriacao, DateTime? dataAlteracao, bool status, bool excluido)
        {
            Id = id;
            DataCriacao = dataCriacao;
            DataAlteracao = DataAlteracao;
            Status = status;
            Excluido = excluido;
        }

        public void Delete()
        {
            Excluido = true;
        }

        public abstract bool Validate();
    }
}
