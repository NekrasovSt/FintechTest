namespace Api.DataAccess;

public class CodeValue
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int Order { get; set; }
    public int Code { get; set; }
    public required string Value { get; set; }
}