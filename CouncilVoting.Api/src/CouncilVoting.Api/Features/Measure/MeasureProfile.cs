using AutoMapper;

namespace CouncilVoting.Api.Features.Measure
{
    public class MeasureProfile : Profile
    {
        public MeasureProfile()
        {
            CreateMap<Create.MeasureData, Domain.Measure>(MemberList.Destination);
            CreateMap<Domain.Measure, MeasureDto>(MemberList.Destination);
            CreateMap<Domain.MeasureVote, MeasureVoteDto>(MemberList.Destination);
            CreateMap<Domain.MeasureRequiredUserName, MeasureRequiredUserNameDto>(MemberList.Destination);
        }

    }
}