using Microsoft.EntityFrameworkCore.Migrations;

namespace LoveNotes.Migrations
{
    public partial class fixModelIds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Speeches_SpeechId",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_Speeches_Users_UserId",
                table: "Speeches");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Speeches",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SpeechId",
                table: "Notes",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Notes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Users_EmailAddress",
                table: "Users",
                column: "EmailAddress",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Speeches_SpeechId",
                table: "Notes",
                column: "SpeechId",
                principalTable: "Speeches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Speeches_Users_UserId",
                table: "Speeches",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Speeches_SpeechId",
                table: "Notes");

            migrationBuilder.DropForeignKey(
                name: "FK_Speeches_Users_UserId",
                table: "Speeches");

            migrationBuilder.DropIndex(
                name: "IX_Users_EmailAddress",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Notes");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Speeches",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "SpeechId",
                table: "Notes",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Speeches_SpeechId",
                table: "Notes",
                column: "SpeechId",
                principalTable: "Speeches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Speeches_Users_UserId",
                table: "Speeches",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
