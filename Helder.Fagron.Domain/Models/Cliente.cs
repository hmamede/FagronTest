using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helder.Fagron.Domain.Models
{
    [Table("Cliente")]
    public class Cliente : EntidadeBase
    {
        public string Nome { get; private set; }
        public string Sobrenome { get; private set; }
        public DateTime DataNascimento { get; private set; }
        public int? ProfissaoId { get; private set; }
        [ForeignKey(nameof(ProfissaoId))]
        public Profissao Profissao { get; set; }
        public Cliente()
        {

        }

        public Cliente(int id, string nome, string sobrenome, DateTime dataNascimento, int? profissaoId, DateTime? dataCriacao, DateTime? dataAlteracao, bool status, bool excluido) : base(id, dataCriacao, dataAlteracao, status, excluido)
        {
            Nome = nome;
            Sobrenome = sobrenome;
            DataNascimento = dataNascimento;
            ProfissaoId = profissaoId;
        }

        public Cliente(string nome, string sobrenome, DateTime dataNascimento, int? profissaoId, bool status)
        {
            Nome = nome;
            Sobrenome = sobrenome;
            DataNascimento = dataNascimento;
            ProfissaoId = profissaoId;
            Status = status;
        }

        public void UpdateProperties(string nome, string sobrenome, int? profissaoId, bool status)
        {
            Nome = nome;
            Sobrenome = sobrenome;
            ProfissaoId = profissaoId;
            Status = status;
        }

        public Cliente New(string nome, string sobrenome, DateTime dataNascimento, int? profissaoId)
        {
            return new Cliente(0, nome, sobrenome, dataNascimento, profissaoId, null, null, true, false);
        }

        public override bool Validate()
        {
            if (string.IsNullOrWhiteSpace(Nome) || Nome.Length > 20)
                return false;

            if (string.IsNullOrWhiteSpace(Sobrenome) || Nome.Length > 30)
                return false;

            return true;
        }
    }
}
