using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CouncilVoting.Api.Infrastructure.Data;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CouncilVoting.Api.Features.MeasureResult
{
    public class Details
    {
        public class Query : IRequest<MeasureResultDtoEnvelope>
        {
            public Query(
                    int id
                 )
            {
                this.Id = id;
            }
            public int Id { get; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(q => q.Id).NotNull()
                        .WithErrorCode("ERR_MEASURE_RESULT_DETAILS_ID_NULL")
                        .NotEmpty()
                        .WithErrorCode("ERR_MEASURE_RESULT_DETAILS_ID_EMPTY")
                        .GreaterThan(0)
                        .WithErrorCode("ERR_MEASURE_RESULT_DETAILS_ID_ZERO_OR_LESS");
            }

        }


        public class QueryHandler : IRequestHandler<Query, MeasureResultDtoEnvelope>
        {
            private IMapper mapper;
            private CouncilVotingContext context;

            public QueryHandler(IMapper mapper, CouncilVotingContext context)
            {
                this.mapper = mapper;
                this.context = context;

            }

            public async Task<MeasureResultDtoEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = context.MeasureVotes.AsNoTracking();
                queryable = queryable.Where(e => e.MeasureId == request.Id);
                var voteTypeResults = await queryable.GroupBy(e => e.VoteTypeName)
                .Select(e => new VoteTypeCount() { VoteTypeName = e.Key, Count = e.Count() }).ToArrayAsync();
                var dto = new MeasureResultDto() { MeasureId = request.Id, Results = voteTypeResults };
                var envelope = new MeasureResultDtoEnvelope(dto);
                return envelope;
            }
        }
    }
}