using Fagron.Helder.Application.Interfaces;
using Fagron.Helder.Application.Servicos.Clientes;
using System.Net;

using System.Threading.Tasks;
using System.Web.Http;

namespace Helder.Fagron.WebApi.Controllers
{
    [RoutePrefix("api/Cliente")]
    public class ClienteController : ApiController
    {
        private IClienteApplicationService _clienteApplicationService { get; }

        public ClienteController(IClienteApplicationService clienteApplicationService)
        {
            _clienteApplicationService = clienteApplicationService;
        }

        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody] ClienteInput site)
        {
            var obj = await _clienteApplicationService.Adicionar(site);
            return Created(Request.RequestUri + "/" + obj.Id, obj);
        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IHttpActionResult> Put(int id, [FromBody] ClienteInput site)
        {
            var obj = await _clienteApplicationService.Atualizar(id, site);
            return Content(HttpStatusCode.Accepted, obj);
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(int id)
        {
            await _clienteApplicationService.Excluir(id);
            return Ok();
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IHttpActionResult> Get(int id)
        {
            return Ok(await _clienteApplicationService.Obter(id));
        }

        [Route("Listar")]
        [HttpGet]
        public async Task<IHttpActionResult> Listar()
        {
            return Ok(await _clienteApplicationService.Listar());
        }
    }
}