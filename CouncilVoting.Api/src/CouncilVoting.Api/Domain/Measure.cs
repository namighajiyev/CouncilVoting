using System;
using System.Collections.Generic;

namespace CouncilVoting.Api.Domain
{
    public class Measure
    {

        public int Id { get; set; }
        public string Subject { get; set; }

        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }

        public int? MinNumOfVotes { get; set; }
        public int? MinPercentOfYesVotes { get; set; }
        public bool? AllowDuplicteVotes { get; set; }

        public bool? IsClosed { get; set; }
        public bool? Passed { get; set; }

        public int? PictureId { get; set; }

        public string VetoUserName { get; set; }

        public DateTime? MinCloseDateTime { get; set; }

        public DateTime? CloseDateTime { get; set; }

        public UserName VetoUserNameEntity { get; set; }

        public Picture Picture { get; set; }

        public ICollection<MeasureVote> Votes { get; set; }

        public ICollection<MeasureRequiredUserName> MeasureRequiredUserNames { get; set; }

    }
}