using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LoveNotes.Migrations
{
    public partial class CreateRegisteredUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RegisteredUserId",
                table: "Speeches",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "RegisteredUsers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    EmailAddress = table.Column<string>(nullable: true)
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

        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
