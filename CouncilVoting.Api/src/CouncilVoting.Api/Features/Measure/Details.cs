using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CouncilVoting.Api.Infrastructure.Data;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CouncilVoting.Api.Features.Measure
{
    public class Details
    {
        public class Query : IRequest<MeasureDtoEnvelope>
        {
            public Query(
                    int id,
                    bool? includeVotes,
                    bool? includeRequiredUserNames
                 )
            {
                this.Id = id;
                this.IncludeVotes = includeVotes ?? false;
                this.IncludeRequiredUserNames = includeRequiredUserNames ?? false;
            }
            public int Id { get; }
            public bool IncludeVotes { get; }
            public bool IncludeRequiredUserNames { get; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(q => q.Id).NotNull()
                        .WithErrorCode("ERR_MEASURE_DETAILS_ID_NULL")
                        .NotEmpty()
                        .WithErrorCode("ERR_MEASURE_DETAILS_ID_EMPTY")
                        .GreaterThan(0)
                        .WithErrorCode("ERR_MEASURE_DETAILS_ID_ZERO_OR_LESS");
            }

        }

        public class QueryHandler : IRequestHandler<Query, MeasureDtoEnvelope>
        {
            private IMapper mapper;
            private CouncilVotingContext context;

            public QueryHandler(IMapper mapper, CouncilVotingContext context)
            {
                this.mapper = mapper;
                this.context = context;

            }

            public async Task<MeasureDtoEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = context.Measures.AsNoTracking();
                queryable = queryable.Where(q => q.Id == request.Id);

                if (request.IncludeRequiredUserNames)
                {
                    queryable = queryable.Include(e => e.MeasureRequiredUserNames);
                }
                if (request.IncludeVotes)
                {
                    queryable = queryable.Include(e => e.Votes);
                }
                var measure = await queryable.FirstOrDefaultAsync();

                if (measure == null)
                {
                    //todo throw some custom not found exception 
                }
                var dto = mapper.Map<MeasureDto>(measure);
                var envelope = new MeasureDtoEnvelope(dto);
                return envelope;
            }
        }

    }
}