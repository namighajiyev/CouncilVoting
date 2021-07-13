namespace CouncilVoting.Api.Features.MeasureVote
{
    public class MeasureVoteDtoEnvelope
    {
        public MeasureVoteDtoEnvelope(MeasureVoteDto measureVote)
        {
            this.MeasureVote = measureVote;
        }
        public MeasureVoteDto MeasureVote { get; set; }
    }
}