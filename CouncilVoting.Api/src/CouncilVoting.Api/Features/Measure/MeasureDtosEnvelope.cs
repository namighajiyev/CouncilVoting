using System.Collections.Generic;

namespace CouncilVoting.Api.Features.Measure
{
    public class MeasureDtosEnvelope
    {
        public MeasureDtosEnvelope(IEnumerable<MeasureDto> measures) {
            this.Measures = measures;
        }
        public IEnumerable<MeasureDto> Measures { get; set; }
    }
}