using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Volga.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updateCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "parentId",
                table: "Categories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_parentId",
                table: "Categories",
                column: "parentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Categories_parentId",
                table: "Categories",
                column: "parentId",
                principalTable: "Categories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Categories_parentId",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Categories_parentId",
                table: "Categories");

            migrationBuilder.AlterColumn<int>(
                name: "parentId",
                table: "Categories",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
