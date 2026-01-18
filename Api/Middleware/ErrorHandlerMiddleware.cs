using System.Net;

namespace Api.Midleware;

public class ErrorHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IServiceProvider _serviceProvider;

    public ErrorHandlerMiddleware(RequestDelegate next, IServiceProvider serviceProvider)
    {
        _next = next ?? throw new ArgumentNullException(nameof(next));
        _serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));
    }

    public async Task InvokeAsync(HttpContext context, ILogger<ErrorHandlerMiddleware> logger)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, ex.Message);
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        }
    }
}