using Microsoft.EntityFrameworkCore;

namespace Api.DataAccess;

public class ApplicationDbContext: DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }
    
    public DbSet<CodeValue> CodeValues { get; set; }
}