using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CouncilVoting.Api.Features.MeasureResult
{
    [ApiController]
    [Route("[controller]")]
    public class MeasureResultController : ControllerBase
    {
        private readonly ILogger<MeasureResultController> logger;
        private readonly IMediator mediator;

        public MeasureResultController(ILogger<MeasureResultController> logger, IMediator mediator)
        {
            this.logger = logger;
            this.mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<MeasureResultDtoEnvelope> Get(int id)
        {
            return await mediator.Send(new Details.Query(id));
        }

    }
}