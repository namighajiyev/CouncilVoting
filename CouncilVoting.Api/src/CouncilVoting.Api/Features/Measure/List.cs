using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CouncilVoting.Api.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CouncilVoting.Api.Features.Measure
{
    public class List
    {
        public class Query : IRequest<MeasureDtosEnvelope>
        {
            //todo add parmeter skip & page for pagination
            public Query(
                    bool? includeVotes,
                    bool? includeRequiredUserNames
                 )
            {
                this.IncludeVotes = includeVotes ?? false;
                this.IncludeRequiredUserNames = includeRequiredUserNames ?? false;
            }
            public bool IncludeVotes { get; }
            public bool IncludeRequiredUserNames { get; }
        }

        public class QueryHandler : IRequestHandler<Query, MeasureDtosEnvelope>
        {
            private IMapper mapper;
            private CouncilVotingContext context;

            public QueryHandler(IMapper mapper, CouncilVotingContext context)
            {
                this.mapper = mapper;
                this.context = context;

            }

            public async Task<MeasureDtosEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = context.Measures.AsNoTracking();

                if (request.IncludeRequiredUserNames)
                {
                    queryable = queryable.Include(e => e.MeasureRequiredUserNames);
                }
                if (request.IncludeVotes)
                {
                    queryable = queryable.Include(e => e.Votes);
                }
                var measures = await queryable.ToArrayAsync();

                var dtos = mapper.Map<IEnumerable<MeasureDto>>(measures);
                var envelope = new MeasureDtosEnvelope(dtos);
                return envelope;
            }
        }

    }
}