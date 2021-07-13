using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CouncilVoting.Api.Features.VoteType
{
    [ApiController]
    [Route("[controller]")]

    public class VoteTypeController : ControllerBase
    {
        private readonly ILogger<VoteTypeController> logger;
        private readonly IMediator mediator;

        public VoteTypeController(ILogger<VoteTypeController> logger, IMediator mediator)
        {
            this.logger = logger;
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<VoteTypeDtosEnvelope> Get()
        {
            return await mediator.Send(new List.Query());
        }


    }
}