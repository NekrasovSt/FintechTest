using System.ComponentModel.DataAnnotations;

namespace Api.Dto;

public class CodeValueDto
{
    public int Code { get; set; }
    [Required] 
    public string Value { get; set; }
}