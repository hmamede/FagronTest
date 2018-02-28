using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fagron.Helder.Application.Servicos.Clientes
{
    public class ClienteInput
    {
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public DateTime DataNascimento { get; set; }
        public bool Status { get; set; }
        public int? ProfissaoId { get; set; }
    }
}
