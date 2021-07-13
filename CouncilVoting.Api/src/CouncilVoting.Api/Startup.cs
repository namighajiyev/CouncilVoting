using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using CouncilVoting.Api.Infrastructure.Data;
using CouncilVoting.Api.Common;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace CouncilVoting.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMediatR(typeof(Startup).Assembly);
            services.AddControllers().AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.IgnoreNullValues = true;
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                });
            services.AddFluentValidation(options =>
            {
                options.RegisterValidatorsFromAssemblyContaining<Startup>();
            });
            services.AddAutoMapper(config => { config.AllowNullCollections = true; }, GetType().Assembly);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "CouncilVoting.Api", Version = "v1" });
                c.CustomSchemaIds(e => e.FullName);
            });


            services.AddCors((options) =>
            {
                options.AddDefaultPolicy((config) =>
                {
                    config.AllowAnyHeader();
                    config.AllowAnyMethod();
                    config.AllowAnyOrigin();
                });
            });

            var connectionString = Configuration.GetValue<string>(Constants.CONN_STRING_KEY);
            services.AddDbContext<CouncilVotingContext>(opt => opt.UseNpgsql(connectionString));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCouncilVotingContextMigration();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CouncilVoting.Api v1"));
                app.UseCors();
            }

            app.UseHttpsRedirection();

            // app.UseExceptionHandler(new ExceptionHandlerOptions()
            // {
            //     AllowStatusCode404Response = true,
            //     ExceptionHandler = ApiExceptionHandler.ExceptionHandler
            // });

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
