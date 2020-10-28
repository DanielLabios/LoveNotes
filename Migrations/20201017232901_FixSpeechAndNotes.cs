using Microsoft.EntityFrameworkCore.Migrations;

namespace LoveNotes.Migrations
{
    public partial class FixSpeechAndNotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RegisteredSpeaker",
                table: "Speeches");

            migrationBuilder.DropColumn(
                name: "Speech",
                table: "Notes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RegisteredSpeaker",
                table: "Speeches",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Speech",
                table: "Notes",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
