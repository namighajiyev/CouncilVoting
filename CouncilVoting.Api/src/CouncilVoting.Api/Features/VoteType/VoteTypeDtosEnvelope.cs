using System.Collections.Generic;

namespace CouncilVoting.Api.Features.VoteType
{
    public class VoteTypeDtosEnvelope
    {
        public VoteTypeDtosEnvelope(IEnumerable<VoteTypeDto> voteTypes)
        {
            this.VoteTypes = voteTypes;
        }

        public IEnumerable<VoteTypeDto> VoteTypes { get; }
    }
}