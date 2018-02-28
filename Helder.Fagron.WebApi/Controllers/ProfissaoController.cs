using Fagron.Helder.Application.Interfaces;
using Fagron.Helder.Application.Servicos.Profissoes;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace Helder.Fagron.WebApi.Controllers
{
    [RoutePrefix("api/Profissao")]
    public class ProfissaoController : ApiController
    {
        private IProfissaoApplicationService _profissaoApplicationService { get; }

        public ProfissaoController(IProfissaoApplicationService profissaoApplicationService)
        {
            _profissaoApplicationService = profissaoApplicationService;
        }

        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody] ProfissaoInput site)
        {
            var obj = await _profissaoApplicationService.Adicionar(site);
            return Created(Request.RequestUri + "/" + obj.Id, obj);
        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IHttpActionResult> Put(int id, [FromBody] ProfissaoInput site)
        {
            var obj = await _profissaoApplicationService.Atualizar(id, site);
            return Content(HttpStatusCode.Accepted, obj);
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(int id)
        {
            await _profissaoApplicationService.Excluir(id);
            return Ok();
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IHttpActionResult> Get(int id)
        {
            return Ok(await _profissaoApplicationService.Obter(id));
        }

        [Route("Listar")]
        [HttpGet]
        public async Task<IHttpActionResult> Listar()
        {
            return Ok(await _profissaoApplicationService.Listar());
        }
    }
}