using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LoveNotes.Migrations
{
    public partial class Passwords : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Speeches_RegisteredUsers_RegisteredUserId",
                table: "Speeches");

            migrationBuilder.DropTable(
                name: "RegisteredUsers");

            migrationBuilder.DropIndex(
                name: "IX_Speeches_RegisteredUserId",
                table: "Speeches");

            migrationBuilder.DropColumn(
                name: "RegisteredUserId",
                table: "Speeches");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Speeches",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserName = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    HashedPassword = table.Column<string>(nullable: true),
                    EmailAddress = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Speeches_UserId",
                table: "Speeches",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Speeches_Users_UserId",
                table: "Speeches",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Speeches_Users_UserId",
                table: "Speeches");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Speeches_UserId",
                table: "Speeches");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Speeches");

            migrationBuilder.AddColumn<int>(
                name: "RegisteredUserId",
                table: "Speeches",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "RegisteredUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmailAddress = table.Column<string>(type: "text", nullable: false),
                    HashedPassword = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: true),
                    UserName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegisteredUsers", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Speeches_RegisteredUserId",
                table: "Speeches",
                column: "RegisteredUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Speeches_RegisteredUsers_RegisteredUserId",
                table: "Speeches",
                column: "RegisteredUserId",
                principalTable: "RegisteredUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
