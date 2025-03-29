FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY TaskManagmentSystem TaskManagmentSystem
WORKDIR /src/TaskManagmentSystem
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish --no-restore

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
CMD ["dotnet", "TaskManagmentSystem.dll"]
