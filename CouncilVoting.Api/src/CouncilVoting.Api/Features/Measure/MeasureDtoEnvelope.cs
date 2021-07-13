namespace CouncilVoting.Api.Features.Measure
{
    public class MeasureDtoEnvelope
    {
        public MeasureDtoEnvelope(MeasureDto measure) {
            this.Measure = measure;
        }
        public MeasureDto Measure { get; set; }
    }
}