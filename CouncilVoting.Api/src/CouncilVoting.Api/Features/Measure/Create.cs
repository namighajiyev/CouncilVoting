using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CouncilVoting.Api.Infrastructure.Data;
using FluentValidation;
using MediatR;

namespace CouncilVoting.Api.Features.Measure
{
    public class Create
    {
        public class MeasureData
        {
            public string Subject { get; set; }

            public string Description { get; set; }
            public int? MinNumOfVotes { get; set; }
            public int? MinPercentOfYesVotes { get; set; }
            public bool? AllowDuplicteVotes { get; set; }

            public int? PictureId { get; set; }

            public string VetoUserName { get; set; }

            public DateTime? MinCloseDateTime { get; set; }

            public DateTime? CloseDateTime { get; set; }
            public string[] RequiredUserNames { get; set; }
        }

        public class Request : IRequest<MeasureDtoEnvelope>
        {
            public MeasureData Measure { get; set; }
        }


        public class MeasureDataValidator : AbstractValidator<MeasureData>
        {
            public MeasureDataValidator()
            {
                RuleFor(x => x.Subject).NotNull()
                        .WithErrorCode("ERR_CREATE_MEASURE_SUBJECT_NULL")
                        .NotEmpty()
                        .WithErrorCode("ERR_CREATE_MEASURE_SUBJECT_EMPTY");

                RuleFor(x => x.Description).NotNull()
                        .WithErrorCode("ERR_CREATE_MEASURE_DESCRIPTION_NULL")
                        .NotEmpty()
                        .WithErrorCode("ERR_CREATE_MEASURE_DESCRIPTION_EMPTY");
            }
        }

        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(x => x.Measure)
                .NotNull()
                .WithErrorCode("ERR_CREATE_MEASURE_REQUEST_MEASURE_NULL")
                .SetValidator(new MeasureDataValidator());
            }
        }
        public class Handler : IRequestHandler<Request, MeasureDtoEnvelope>
        {
            private readonly IMapper mapper;
            private readonly CouncilVotingContext context;

            public Handler(IMapper mapper, CouncilVotingContext context)
            {
                this.mapper = mapper;
                this.context = context;
            }
            public async Task<MeasureDtoEnvelope> Handle(Request request, CancellationToken cancellationToken)
            {
                var data = request.Measure;
                var measure = mapper.Map<Domain.Measure>(data);
                if (!string.IsNullOrWhiteSpace(data.VetoUserName))
                {
                    var vetoUserName = context.GetUserName(data.VetoUserName);
                    measure.VetoUserName = vetoUserName.Name;
                }

                if (data.RequiredUserNames != null && data.RequiredUserNames.Length > 0)
                {
                    foreach (var userName in data.RequiredUserNames)
                    {
                        var usernameEntity = context.GetUserName(userName);

                        var requiredUserName = new Domain.MeasureRequiredUserName()
                        {
                            Measure = measure,
                            UserName = usernameEntity.Name
                        };

                        await context.MeasureRequiredUserNames.AddAsync(requiredUserName);
                    }
                }

                measure.CreatedAt = DateTime.Now;
                await context.Measures.AddAsync(measure);
                await context.SaveChangesAsync();
                await context.Entry(measure).ReloadAsync();
                var dto = mapper.Map<MeasureDto>(measure);
                var envelope = new MeasureDtoEnvelope(dto);
                return envelope;
            }
        }

    }
}