using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fagron.Helder.Application.Servicos.Profissoes
{
    public class ProfissaoViewModel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public bool Status { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime? DataAlteracao { get; set; }
    }
}
