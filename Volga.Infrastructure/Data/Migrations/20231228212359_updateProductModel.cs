using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Volga.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updateProductModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Sales",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<byte[]>(
                name: "TimestampFirstAdded",
                table: "Products",
                type: "rowversion",
                rowVersion: true,
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<int>(
                name: "Views",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ratingCount",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ratingSum",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sales",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "TimestampFirstAdded",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Views",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ratingCount",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ratingSum",
                table: "Products");
        }
    }
}
