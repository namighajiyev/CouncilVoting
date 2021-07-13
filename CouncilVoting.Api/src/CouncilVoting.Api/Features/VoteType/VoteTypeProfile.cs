using AutoMapper;

namespace CouncilVoting.Api.Features.VoteType
{
    public class VoteTypeProfile : Profile
    {
        public VoteTypeProfile()
        {
            CreateMap<Domain.VoteType, VoteTypeDto>(MemberList.Destination);
        }

    }
}        
