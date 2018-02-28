using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fagron.Helder.Application.Servicos.Clientes
{
    public class ClienteViewModel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public DateTime DataNascimento { get; set; }
        public int? ProfissaoId { get; set; }
        public string Profissao { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime? DataAlteracao { get; set; }
        public bool Status { get; set; }
        public int Idade
        {
            get
            {
                var hoje = DateTime.Now.Date;
                var idade = hoje.Year - DataNascimento.Year;

                return DataNascimento.AddYears(idade) > hoje ? idade - 1 : idade;
            }
        }

        public string DataNascimentoStr
        {
            get
            {
                return DataNascimento.ToShortDateString();
            }
        }
    }
}
