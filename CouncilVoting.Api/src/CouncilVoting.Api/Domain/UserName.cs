using System.Collections.Generic;

namespace CouncilVoting.Api.Domain
{
    public class UserName
    {
        public string Name { get; set; }

        public ICollection<MeasureRequiredUserName> MeasureRequiredUserNames { get; set; }
    }
}