using AutoMapper;

namespace CouncilVoting.Api.Features.MeasureVote
{
    public class MeasureVoteProfile : Profile
    {
        public MeasureVoteProfile()
        {
            CreateMap<Domain.MeasureVote, MeasureVoteDto>(MemberList.Destination);
            CreateMap<Create.MeasureVoteData, Domain.MeasureVote>(MemberList.Destination);
        }

    }
}