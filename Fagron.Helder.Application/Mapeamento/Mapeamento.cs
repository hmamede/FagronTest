using AutoMapper;
using Fagron.Helder.Application.Servicos.Clientes;
using Fagron.Helder.Application.Servicos.Profissoes;
using Helder.Fagron.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fagron.Helder.Application.Mapeamento
{
    public class Mapeamento : Profile
    {
        public Mapeamento()
        {
            CreateMap<Cliente, ClienteViewModel>()
                .ForMember("Profissao", a => a.MapFrom(b => b.Profissao.Nome));

            CreateMap<Profissao, ProfissaoViewModel>();
        }
    }
}
