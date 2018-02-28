using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helder.Fagron.Domain.Models
{
    [Table("Profissao")]
    public class Profissao : EntidadeBase
    {
        public string Nome { get; private set; }

        public Profissao()
        {

        }

        public Profissao(int id, string nome, DateTime? dataCriacao, DateTime? dataAlteracao, bool status, bool excluido) : base(id, dataCriacao, dataAlteracao, status, excluido)
        {
            Nome = nome;
        }

        public Profissao(string nome, bool status)
        {
            Nome = nome;
            Status = status;
        }

        public void UpdateProperties(string nome, bool status)
        {
            Nome = nome;
            Status = status;
        }

        public Profissao New(string nome)
        {
            return new Profissao(0, nome, null, null, true, false);
        }

        public override bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Nome) || Nome.Length > 50)
                return false;
            return true;
        }
    }
}
