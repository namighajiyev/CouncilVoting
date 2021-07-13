# Council voting


## Run project project
### Development

#### Run api
1. ##### Change to api project folder
	`cd CouncilVoting.Api/src/CouncilVoting.Api/`
2. ##### Set PostgreSQL Database connection string
	`dotnet user-secrets set "CouncilVoting:ConnectionString" "Server=host;Port=port;Database=db;Username=user;Password=password"`
3. ##### Start api
	`dotnet run`

##### Run web/frontend
    
1. ##### Change to api project folder
	`cd CouncilVoting.Web/`
2. ##### Install packages
	`yarn`
    
3. ##### Start frontend
	`yarn start`