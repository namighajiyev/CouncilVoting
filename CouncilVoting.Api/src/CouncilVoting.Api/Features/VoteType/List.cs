using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CouncilVoting.Api.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CouncilVoting.Api.Features.VoteType
{
    public class List
    {
        public class Query : IRequest<VoteTypeDtosEnvelope>
        {
        }

        public class QueryHandler : IRequestHandler<Query, VoteTypeDtosEnvelope>
        {
            private IMapper mapper;
            private CouncilVotingContext context;

            public QueryHandler(IMapper mapper, CouncilVotingContext context)
            {
                this.mapper = mapper;
                this.context = context;

            }

            public async Task<VoteTypeDtosEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = context.VoteTypes.AsNoTracking();
                var voteTypes = await queryable.ToArrayAsync();

                var dtos = mapper.Map<IEnumerable<VoteTypeDto>>(voteTypes);
                var envelope = new VoteTypeDtosEnvelope(dtos);
                return envelope;
            }
        }

    }
}