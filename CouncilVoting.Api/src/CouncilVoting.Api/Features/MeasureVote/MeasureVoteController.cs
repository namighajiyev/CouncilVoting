using System.Net;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CouncilVoting.Api.Features.MeasureVote
{
    [ApiController]
    [Route("[controller]")]
    public class MeasureVoteController: ControllerBase
    {
        private readonly ILogger<MeasureVoteController> logger;
        private readonly IMediator mediator;

        public MeasureVoteController(ILogger<MeasureVoteController> logger, IMediator mediator)
        {
            this.logger = logger;
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<MeasureVoteDtoEnvelope> Create([FromBody] Create.Request command)
        {
            var result = await mediator.Send(command);
            HttpContext.Response.StatusCode = (int)HttpStatusCode.Created;
            return result;
        }
        
    }
}