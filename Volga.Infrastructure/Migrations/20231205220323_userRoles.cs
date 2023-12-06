﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Volga.Infrastructure.Migrations
{
	/// <inheritdoc />
	public partial class userRoles : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.Sql("SET IDENTITY_INSERT AspNetRoles ON;");
			migrationBuilder.Sql("INSERT INTO AspNetRoles (Id, [Name], NormalizedName) VALUES (1, 'Admin', 'ADMIN')");
			migrationBuilder.Sql("INSERT INTO AspNetRoles (Id, [Name], NormalizedName) VALUES (2, 'User', 'USER')");
			migrationBuilder.Sql("SET IDENTITY_INSERT AspNetRoles OFF;");
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.Sql("DELETE FROM AspNetRoles WHERE Id = '1'");
			migrationBuilder.Sql("DELETE FROM AspNetRoles WHERE Id = '2'");
		}
	}
}