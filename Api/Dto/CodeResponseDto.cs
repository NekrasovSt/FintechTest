using System.ComponentModel.DataAnnotations;

namespace Api.Dto;

public class CodeResponseDto
{
    [Required] 
    public int Code { get; set; }
    [Required] 
    public string Value { get; set; }
    [Required] 
    public int Order { get; set; }
}