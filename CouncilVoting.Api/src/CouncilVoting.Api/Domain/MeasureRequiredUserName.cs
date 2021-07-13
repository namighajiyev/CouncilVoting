namespace CouncilVoting.Api.Domain
{
    public class MeasureRequiredUserName
    {
        public int MeasureId { get; set; }
        public string UserName { get; set; }

        public Measure Measure { get; set; }
        public UserName UserNameEntity { get; set; }
    }
}