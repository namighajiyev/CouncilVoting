using System.Collections.Generic;

namespace CouncilVoting.Api.Features.MeasureResult
{
    public class MeasureResultDto
    {
        public int MeasureId { get; set; }

        public IEnumerable<VoteTypeCount> Results { get; set; }
    }
}