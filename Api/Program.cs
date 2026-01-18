using Api;
using Api.DataAccess;
using Api.Dto;
using Api.Interfaces;
using Api.Midleware;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using MiniValidation;

var builder = WebApplication.CreateBuilder(args);
Startup.SetupServices(builder);
var app = builder.Build();


app.UseCors("AllowAll");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi("/openapi");
}

app.UseHttpsRedirection();
app.UseMiddleware<ErrorHandlerMiddleware>();

Startup.InitDb(app.Services);

app.MapPost("/codes",
        async ([FromBody] IEnumerable<CodeValueDto> dto, ICodeService codeService, CancellationToken token) =>
        {
            if (Invalid(dto, out var result))
            {
                return result;
            }

            var ordered = await codeService.AddCodesAsync(dto.Adapt<IEnumerable<CodeValue>>(), token);
            return Results.Created("/codes", ordered.Adapt<IEnumerable<CodeResponseDto>>());
        })
    .WithOpenApi()
    .WithName("AddCodes")
    .Produces<IEnumerable<CodeResponseDto>>(StatusCodes.Status201Created)
    .Produces(StatusCodes.Status400BadRequest);

app.MapGet("/codes", async ([AsParameters] CodeQuery query, ICodeService codeService, CancellationToken token) =>
    {
        var result = await codeService.GetCodesAsync(query.Search, query.Take, query.Skip, token);
        return Results.Ok(result.Adapt<IEnumerable<CodeResponseDto>>());
    })
    .WithOpenApi()
    .WithName("GetCodes")
    .Produces<IEnumerable<CodeResponseDto>>(StatusCodes.Status200OK);

app.MapGet("/codes/{code}/value", async ([FromRoute] int code, ICodeService codeService, CancellationToken token) =>
    {
        var result = await codeService.GetValuesByCodeAsync(code, token);
        return Results.Ok(result);
    }).WithOpenApi()
    .WithName("GetValuesByCode")
    .Produces<IEnumerable<string>>(StatusCodes.Status200OK);

app.Run();

bool Invalid(IEnumerable<CodeValueDto> codeValueDtos, out IResult? result)
{
    result = null;
    var isValid = MiniValidator.TryValidate(codeValueDtos, out var errors);
    if (!isValid)
    {
        result = Results.ValidationProblem(errors);
        return true;
    }

    return false;
}