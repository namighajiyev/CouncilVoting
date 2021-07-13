using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CouncilVoting.Api.Infrastructure.Data;
using FluentValidation;
using MediatR;

namespace CouncilVoting.Api.Features.MeasureVote
{
    public class Create
    {
        public class MeasureVoteData
        {
            public int MeasureId { get; set; }
            public string UserName { get; set; }
            public string VoteTypeName { get; set; }

        }

        public class Request : IRequest<MeasureVoteDtoEnvelope>
        {
            public MeasureVoteData MeasureVote { get; set; }
        }

        public class MeasureVoteDataValidator : AbstractValidator<MeasureVoteData>
        {
            public MeasureVoteDataValidator()
            {
                RuleFor(x => x.MeasureId).NotNull()
                        .WithErrorCode("ERR_CREATE_MEASURE_VOTE_MEASURE_ID_NULL")
                        .NotEmpty()
                        .WithErrorCode("ERR_CREATE_MEASURE_VOTE_MEASURE_ID_EMPTY");

                RuleFor(x => x.UserName).NotNull()
                        .WithErrorCode("ERR_CREATE_MEASURE_VOTE_USER_NAME_NULL")
                        .NotEmpty()
                        .WithErrorCode("ERR_CREATE_MEASURE_VOTE_USER_NAME_EMPTY");


                RuleFor(x => x.VoteTypeName).NotNull()
                        .WithErrorCode("ERR_CREATE_MEASURE_VOTE_VOTE_TYPE_NAME_NULL")
                        .NotEmpty()
                        .WithErrorCode("ERR_CREATE_MEASURE_VOTE_VOTE_TYPE_NAME_EMPTY");

            }
        }

        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(x => x.MeasureVote)
                .NotNull()
                .WithErrorCode("ERR_CREATE_MEASURE_VOTE_REQUEST_MEASURE_VOTE_NULL")
                .SetValidator(new MeasureVoteDataValidator());
            }
        }

        public class Handler : IRequestHandler<Request, MeasureVoteDtoEnvelope>
        {
            private readonly IMapper mapper;
            private readonly CouncilVotingContext context;

            public Handler(IMapper mapper, CouncilVotingContext context)
            {
                this.mapper = mapper;
                this.context = context;
            }
            public async Task<MeasureVoteDtoEnvelope> Handle(Request request, CancellationToken cancellationToken)
            {
                var data = request.MeasureVote;
                //todo check if measureId && votetypename is valid
                var measureVote = mapper.Map<Domain.MeasureVote>(data);
                measureVote.CreatedAt = DateTime.Now;
                await context.MeasureVotes.AddAsync(measureVote);
                await context.SaveChangesAsync();
                //todo calculate is closed && is passed
                await context.Entry(measureVote).ReloadAsync();
                var dto = mapper.Map<MeasureVoteDto>(measureVote);
                var envelope = new MeasureVoteDtoEnvelope(dto);
                return envelope;
            }

        }


    }
}