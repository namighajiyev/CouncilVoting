using System.Net;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CouncilVoting.Api.Features.Measure
{
    [ApiController]
    [Route("[controller]")]
    public class MeasureController : ControllerBase
    {
        private readonly ILogger<MeasureController> logger;
        private readonly IMediator mediator;

        public MeasureController(ILogger<MeasureController> logger, IMediator mediator)
        {
            this.logger = logger;
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<MeasureDtoEnvelope> Create([FromBody] Create.Request command)
        {
            var result = await mediator.Send(command);
            HttpContext.Response.StatusCode = (int)HttpStatusCode.Created;
            return result;
        }

        [HttpGet("{id}")]
        public async Task<MeasureDtoEnvelope> Get(int id,
        [FromQuery] bool? includeVotes,
        [FromQuery] bool? includeRequiredUserNames
        )
        {
            return await mediator.Send(new Details.Query(id, includeVotes, includeRequiredUserNames));
        }

        [HttpGet]
        public async Task<MeasureDtosEnvelope> Get(
            [FromQuery] bool? includeVotes,
            [FromQuery] bool? includeRequiredUserNames
            )
        {
            return await mediator.Send(new List.Query(includeVotes, includeRequiredUserNames));
        }
    }
}