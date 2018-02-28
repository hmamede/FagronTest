using AutoMapper;
using Fagron.Helder.Application.Interfaces;
using Helder.Fagron.Domain.Interfaces;
using Helder.Fagron.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fagron.Helder.Application.Servicos.Profissoes
{
    public class ProfissaoApplicationService : IProfissaoApplicationService
    {
        private readonly IMapper _mapper;
        private readonly IProfissaoRepositorio _profissaoRepositorio;

        public ProfissaoApplicationService(
            IMapper mapper,
            IProfissaoRepositorio profissaoRepositorio)
        {
            _mapper = mapper;
            _profissaoRepositorio = profissaoRepositorio;
        }

        public async Task<ProfissaoViewModel> Adicionar(ProfissaoInput input)
        {
            var profissao = new Profissao(input.Nome, input.Status);
            await _profissaoRepositorio.Inserir(profissao);

            return _mapper.Map<ProfissaoViewModel>(profissao);
        }

        public async Task<ProfissaoViewModel> Atualizar(int id, ProfissaoInput input)
        {
            var profissao = await ObterProfissao(id);

            profissao.UpdateProperties(input.Nome, input.Status);
            await _profissaoRepositorio.Atualizar(profissao);

            return _mapper.Map<ProfissaoViewModel>(profissao);
        }

        public async Task Excluir(int id)
        {
            var profissao = await ObterProfissao(id);
            await _profissaoRepositorio.Excluir(profissao);
        }

        public async Task<List<ProfissaoViewModel>> Listar()
        {
            var profissoes = await _profissaoRepositorio.ListarPor(x => x.Status && !x.Excluido);
            return _mapper.Map<List<ProfissaoViewModel>>(profissoes.OrderBy(x => x.Nome));
        }

        public async Task<ProfissaoViewModel> Obter(int id)
        {
            var profissao = await ObterProfissao(id);
            return _mapper.Map<ProfissaoViewModel>(profissao);
        }

        private async Task<Profissao> ObterProfissao(int id)
        {
            var profissao = await _profissaoRepositorio.ObterPorId(id);

            if (profissao == null)
                throw new Exception(string.Format("Profissão ({0}) não encontrada", id));

            return profissao;
        }
    }
}
