using System;

namespace CouncilVoting.Api.Domain
{
    public class MeasureVote
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public int MeasureId { get; set; }

        public string VoteTypeName { get; set; }
        public Measure Measure { get; set; }
        public VoteType VoteType { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}