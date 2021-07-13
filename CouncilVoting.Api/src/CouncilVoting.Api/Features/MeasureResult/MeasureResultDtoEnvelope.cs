namespace CouncilVoting.Api.Features.MeasureResult
{
    public class MeasureResultDtoEnvelope
    {
        public MeasureResultDtoEnvelope(MeasureResultDto measureResult)
        {
            this.MeasureResult = measureResult;
        }
        public MeasureResultDto MeasureResult { get; set; }
    }
}