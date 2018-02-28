using AutoMapper;
using Fagron.Helder.Application.Interfaces;
using Helder.Fagron.Domain.Interfaces;
using Helder.Fagron.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fagron.Helder.Application.Servicos.Clientes
{
    public class ClienteApplicationService : IClienteApplicationService
    {
        private readonly IMapper _mapper;
        private readonly IClienteRepositorio _clienteRepositorio;

        public ClienteApplicationService(
            IMapper mapper,
            IClienteRepositorio clienteRepositorio)
        {
            _mapper = mapper;
            _clienteRepositorio = clienteRepositorio;
        }

        public async Task<ClienteViewModel> Adicionar(ClienteInput input)
        {
            var cliente = new Cliente(input.Nome, input.Sobrenome, input.DataNascimento.Date, input.ProfissaoId, input.Status);
            await _clienteRepositorio.Inserir(cliente);

            return _mapper.Map<ClienteViewModel>(cliente);
        }

        public async Task<ClienteViewModel> Atualizar(int id, ClienteInput input)
        {
            var cliente = await ObterCliente(id);

            cliente.UpdateProperties(input.Nome, input.Sobrenome, input.ProfissaoId, input.Status);
            await _clienteRepositorio.Atualizar(cliente);

            return _mapper.Map<ClienteViewModel>(cliente);
        }

        public async Task Excluir(int id)
        {
            var cliente = await ObterCliente(id);
            await _clienteRepositorio.Excluir(cliente);
        }

        public async Task<List<ClienteViewModel>> Listar()
        {
            var clientes = await _clienteRepositorio.ListarPor(x=> !x.Excluido);
            return _mapper.Map<List<ClienteViewModel>>(clientes.OrderBy(x => x.Nome));
        }

        public async Task<ClienteViewModel> Obter(int id)
        {
            var cliente = await ObterCliente(id);
            return _mapper.Map<ClienteViewModel>(cliente);
        }

        private async Task<Cliente> ObterCliente(int id)
        {
            var cliente = await _clienteRepositorio.ObterPorId(id);

            if (cliente == null)
                throw new Exception(string.Format("Cliente ({0}) não encontrado", id));

            return cliente;
        }
    }
}
