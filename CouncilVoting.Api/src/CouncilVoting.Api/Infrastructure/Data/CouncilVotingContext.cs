using CouncilVoting.Api.Common;
using CouncilVoting.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace CouncilVoting.Api.Infrastructure.Data
{
    public class CouncilVotingContext : DbContext
    {

        public CouncilVotingContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Measure> Measures { get; set; }
        public DbSet<MeasureRequiredUserName> MeasureRequiredUserNames { get; set; }
        public DbSet<MeasureVote> MeasureVotes { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<UserName> UserNames { get; set; }
        public DbSet<VoteType> VoteTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseIdentityColumns();

            modelBuilder.Entity<Measure>().Property(e => e.Subject).IsRequired().HasMaxLength(Constants.MEASURE_SUBJECT_LEN);
            modelBuilder.Entity<Measure>().Property(e => e.Description).IsRequired().HasMaxLength(Constants.MEASURE_DESCRIPTION_LEN);
            modelBuilder.Entity<Measure>().Property(e => e.CreatedAt).IsRequired();
            modelBuilder.Entity<Measure>().Property(e => e.AllowDuplicteVotes).HasDefaultValue(true);
            modelBuilder.Entity<Measure>().Property(e => e.IsClosed).HasDefaultValue(false);
            modelBuilder.Entity<Measure>().Property(e => e.Passed).HasDefaultValue(false);

            modelBuilder.Entity<MeasureRequiredUserName>().HasKey(e => new { e.MeasureId, e.UserName });
            modelBuilder.Entity<MeasureRequiredUserName>()
            .HasOne(e => e.Measure)
            .WithMany(e => e.MeasureRequiredUserNames);
            modelBuilder.Entity<MeasureRequiredUserName>()
           .HasOne(e => e.UserNameEntity)
           .WithMany(e => e.MeasureRequiredUserNames);

            modelBuilder.Entity<MeasureVote>()
            .HasOne(e => e.VoteType)
            .WithMany(e => e.Votes);
            modelBuilder.Entity<MeasureVote>()
            .HasOne(e => e.Measure)
            .WithMany(e => e.Votes);
            modelBuilder.Entity<MeasureVote>().Property(e => e.CreatedAt).IsRequired();

            modelBuilder.Entity<Picture>().Property(e => e.Path)
            .IsRequired();
            modelBuilder.Entity<Picture>().HasIndex(e => e.Path).IsUnique();

            modelBuilder.Entity<UserName>().HasKey(e => e.Name);
            modelBuilder.Entity<UserName>().Property(e => e.Name).HasMaxLength(Constants.USERNAME_NAME_LEN);

            modelBuilder.Entity<VoteType>().HasKey(e => e.Name);
            modelBuilder.Entity<VoteType>().Property(e => e.Name).HasMaxLength(Constants.VOTE_TYPE_NAME_LEN);
            modelBuilder.Entity<VoteType>().HasData(SeedData.VoteTypes.Yes, SeedData.VoteTypes.No);

        }

    }
}