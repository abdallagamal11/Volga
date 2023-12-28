using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Volga.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class supportCategoryImg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Imgs",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImgUrl",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Imgs",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ImgUrl",
                table: "Categories");
        }
    }
}
