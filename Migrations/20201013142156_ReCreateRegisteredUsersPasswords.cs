using Microsoft.EntityFrameworkCore.Migrations;

namespace LoveNotes.Migrations
{
    public partial class ReCreateRegisteredUsersPasswords : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "RegisteredUsers");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "RegisteredUsers",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "EmailAddress",
                table: "RegisteredUsers",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HashedPassword",
                table: "RegisteredUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HashedPassword",
                table: "RegisteredUsers");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "RegisteredUsers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "EmailAddress",
                table: "RegisteredUsers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "RegisteredUsers",
                type: "text",
                nullable: true);
        }
    }
}
