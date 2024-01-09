var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// Builder controls dependency injections, provide services that can be added

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// app controls the HTTP request pipeline
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Starts the program
app.Run();
