namespace CouncilVoting.Api.Features.MeasureVote
{
    public class MeasureVoteDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public int MeasureId { get; set; }

        public string VoteTypeName { get; set; }
    }
}