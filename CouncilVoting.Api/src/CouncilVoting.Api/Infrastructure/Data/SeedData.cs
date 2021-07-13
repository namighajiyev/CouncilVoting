using CouncilVoting.Api.Domain;

namespace CouncilVoting.Api.Infrastructure.Data
{
    public class SeedData
    {
        public static class VoteTypes
        {
            public static readonly VoteType Yes = new VoteType() { Name = "Yes" };
            public static readonly VoteType No = new VoteType() { Name = "No" };

        }
    }
}