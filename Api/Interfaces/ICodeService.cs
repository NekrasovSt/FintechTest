using Api.DataAccess;

namespace Api.Interfaces;

public interface ICodeService
{
    Task<IEnumerable<CodeValue>> AddCodesAsync(IEnumerable<CodeValue> codes, CancellationToken token);
    Task<IEnumerable<CodeValue>> GetCodesAsync(string? search, int? take, int? skip, CancellationToken token);
    Task<IEnumerable<string>> GetValuesByCodeAsync(int code, CancellationToken token);
}