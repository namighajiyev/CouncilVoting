using CouncilVoting.Api.Domain;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CouncilVoting.Api.Infrastructure.Data
{
    public static class CouncilVotingContextExtentions
    {
        public static IApplicationBuilder UseCouncilVotingContextMigration(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<CouncilVotingContext>();
                //context.Database.Migrate();
                //context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
            }
            return app;
        }

        public static UserName GetUserName(this CouncilVotingContext context, string userName)
        {
            var userNameEntity = context.UserNames.Find(userName) ?? new UserName() { Name = userName };
            if (userNameEntity.Name == null)
            {
                context.UserNames.Add(userNameEntity);
                context.SaveChanges();
            }
            return userNameEntity;
        }
    }
}