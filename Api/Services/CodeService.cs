using Api.DataAccess;
using Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public class CodeService : ICodeService
{
    private readonly ApplicationDbContext _dbContext;

    public CodeService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }

    public async Task<IEnumerable<CodeValue>> AddCodesAsync(IEnumerable<CodeValue> codes, CancellationToken token)
    {
        var ordered = codes.OrderBy(i => i.Code).Select((c, i) => new CodeValue()
        {
            Code = c.Code,
            Value = c.Value,
            Order = i,
        }).ToList();
        // Если данных будет много, то лучше использовать truncate
        await _dbContext.CodeValues.ExecuteDeleteAsync(token);
        await _dbContext.CodeValues.AddRangeAsync(ordered, token);
        await _dbContext.SaveChangesAsync(token);
        return ordered;
    }

    public async Task<IEnumerable<CodeValue>> GetCodesAsync(string? search, int? take, int? skip,
        CancellationToken token)
    {
        var query = _dbContext
            .CodeValues.OrderBy(i => i.Order)
            .AsNoTracking();
        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(i => i.Value.Contains(search));
        }

        if (skip.HasValue)
        {
            var skipValue = skip.Value;
            query = query.Skip(skipValue);
        }

        if (take.HasValue)
        {
            var takeValue = take.Value;
            query = query.Take(takeValue);
        }


        return await query.ToListAsync(token);
    }

    public async Task<IEnumerable<string>> GetValuesByCodeAsync(int code, CancellationToken token)
    {
        return await _dbContext.CodeValues
            .AsNoTracking()
            .Where(i => i.Code == code)
            .Select(i => i.Value)
            .ToListAsync(token);
    }
}