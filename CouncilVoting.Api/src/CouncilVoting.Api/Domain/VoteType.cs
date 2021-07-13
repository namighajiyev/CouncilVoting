using System.Collections.Generic;

namespace CouncilVoting.Api.Domain
{
    public class VoteType
    {
        public string Name { get; set; }

        public ICollection<MeasureVote> Votes { get; set; }
    }
}